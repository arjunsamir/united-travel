// Import Node Modules
const fs = require('fs');
const path = require('path');

// Import Models
const Quote = require('../models/quote');

// Import Utilities
const { Client } = require("@googlemaps/google-maps-services-js");
const send = require('../utils/sendResponse');

// Import Helpers
const catchAsync = require('../utils/catchAsync');

// Initialize Maps Client
const client = new Client({})

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET);


// Read Algorithm Data into memory
let touristZips = fs.readFileSync(path.join(__dirname, '../data/pricing/tourist-zip-codes.json'), 'utf8');
let algorithmData = fs.readFileSync(path.join(__dirname, '../data/pricing/algorithm.json'), 'utf8');
touristZips = touristZips ? JSON.parse(touristZips) : [];
algorithmData = algorithmData ? JSON.parse(algorithmData) : {};


// Geocode Location to retrieve zip codes
const geocode = async (place_id) => {
    const res = await client.geocode({
        params: {
            place_id,
            key: process.env.GOOGLE_MAPS_API_KEY
        }
    });

    if (!res || !res.data || !res.data.results || !res.data.results[0] || !res.data.results[0].address_components || !res.data.results[0].address_components.length) return {
        zip: "99999",
        data: {}
    };

    const zip = res.data.results[0].address_components.filter(c => {
        if (!c.types || !c.types.length) return null;
        const postalType = c.types.find(type => type === "postal_code");
        return postalType ? c : null;
    })[0]

    return {
        zip: zip ? zip.long_name : "99999",
        data: res.data.results[0]
    }
}


// Check if zip is whitelisted
const checkZipList = (origin, destination) => {
    return touristZips.filter(zip => zip === origin || zip === destination).length === 2;
}


// Calculate cost of trip
const calculateCost = (vehicle, distance, isTouristZip) => {

    // Destructure Items
    const { fees, rates, thresholds, mpg } = algorithmData;
    const { extended, tourist } = thresholds;
    const { discounts, base } = rates;

    // Convert To Miles
    const d = distance;
    const miles = {
        total: d,
        under: 0,
        tourist: 0,
        extended: 0
    }

    if (d >= extended) {
        miles.extended = d - extended;
        d = extended;
    }

    if (d >= tourist) {
        miles.tourist = d - tourist;
        d = tourist
    }

    miles.under = d;

    // Get base Fare
    const baseFee = fees[vehicle] || fees.base;

    // Get Multiplier
    const multiplier = mpg.base / (mpg[vehicle] || mpg.base);

    // Calculate Variable Cost
    const variableCost =
        (miles.under * (base - (isTouristZip ? discounts.tourist : 0))) + 
        (miles.tourist * (base - discounts.tourist)) + 
        (miles.extended * (base - (discounts.extended[vehicle] || discounts.extended.base)))
    ;

    // Return Calculated Total
    return Math.round((baseFee + (multiplier * variableCost)) * 100) / 100
}


// Create Exports
exports.getQuote = catchAsync(async (req, res, next) => {

    const { vehicle, origin, destination } = req.body;
    const distance = Math.ceil(req.body.distance / 1609.34);

    if (!origin || !destination || !vehicle || !distance) return res.json({
        status: 'ERROR',
        message: 'Missimg request data'
    })

    const geocoded = {
        origin: geocode(origin).then(data => geocoded.origin = data),
        destination: geocode(destination).then(data => geocoded.destination = data)
    }

    await Promise.all([geocoded.origin, geocoded.destination]);

    const cost = calculateCost(vehicle, distance, checkZipList(geocoded.origin.zip, geocoded.destination.zip));

    const quote = await Quote.create({
        origin,
        destination,
        distance,
        vehicle,
        cost
    })

    res.json({
        status: 'SUCCESS',
        quote
    })

});


// Called By Webhook. Charge Payment
exports.confirmPayment = async (req, res, next) => {

    const event = req.body;

    console.log(event);

    send(res, {
        recieved: true
    })
    
};


// Create Payment Intent and Send to Client
exports.createPayment = async (req, res) => {

    const { id } = req.body;

    try {

        // Retrieve Quote to calculate cost
        const quote = await Quote.findById(id)
        if (!quote) throw new Error('No quote found!')

        // Initialize Variables
        const amount = quote.cost * 100;
        const { user } = req;
        let customer, paymentMethods = [];

        // Create or Retrieve Customer
        if (user && user.stripeID) {
            customer = await stripe.customers.retrieve(user.stripeID);
            
        }
        else if (user) {
            customer = await stripe.customers.create({
                name: user.name,
                email: user.email
            });

            user.stripeID = customer.id;
            await user.save()
        }

        // Retrieve Saved Payment Methods
        if (customer) {

            const list = await stripe.paymentMethods.list({
                customer: customer.id,
                type: 'card'
            })

            paymentMethods = list.data.map(item => {
                const { card } = item;
                return {
                    id: item.id,
                    brand: card.brand,
                    digits: card.last4,
                    expiration: {
                        month: card.exp_month,
                        year: card.exp_year
                    }
                }
            })

        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            statement_descriptor: 'Ride Transport',
            payment_method_types: ['card'],
            customer: customer ? customer.id : null
        })

        // Send Response
        send(res, {
            message: 'Success',
            secret: paymentIntent.client_secret,
            paymentMethods,
            amount,
            cost: quote.cost
        })

    }

    catch (error) {
        send(res, {
            message: 'Error',
            success: false,
            error
        })
    }

}