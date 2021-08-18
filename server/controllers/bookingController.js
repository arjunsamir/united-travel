// Import Node Modules
const fs = require('fs');
const path = require('path');

// Import Models
const Quote = require('../models/quote');
const Vehicle = require('../models/vehicle');
const Settings = require('../models/settings');

// Import Utilities
const { Client } = require("@googlemaps/google-maps-services-js");
const send = require('../utils/sendResponse');

// Import Helpers
const catchAsync = require('../utils/catchAsync');

// Initialize Maps Client
const client = new Client({})

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Get Settings on App Load
const settings = {
    promise: Settings.findOne({ active: true }).then(res => settings.data = res.toObject())
}


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
    return settings.data.touristZips.filter(zip => zip === origin || zip === destination).length === 2;
}


// Calculate cost of trip
const calculateCost = (vehicle, distance, isTouristZip) => {

    // Destructure Values
    const { thresholds: { extended, tourist }, baseMpg } = settings.data;
    const { rates, mpg } = vehicle;


    // Set Up Variables
    let d = distance;
    const multiplier = baseMpg / mpg;


    // Set Up Miles Counter
    const miles = {
        total: d,
        under: 0,
        tourist: 0,
        extended: 0
    };

    if (d >= extended) {
        miles.extended = d - extended;
        d = extended;
    }

    if (d >= tourist) {
        miles.tourist = d - tourist;
        d = tourist
    }

    miles.under = d;

    const variableCost = (miles.under * (isTouristZip ? rates.tourist : rates.base)) +
        (miles.tourist * rates.tourist) +
        (miles.extended * rates.extended);

    const cost = Math.ceil(variableCost * multiplier + rates.fee);

    return {
        cents: cost,
        dollars: (cost / 100).toFixed(2)
    }

}


// Create Exports
exports.getQuote = catchAsync(async (req, res, next) => {

    // In case settins isn't loaded wait for it
    await settings.promise;


    // Destructure Params
    const { passengers, origin, destination, distance: meters } = req.body;


    // If Params are missing then return
    if (!origin || !destination || !passengers || !meters) return res.json({
        status: 'ERROR',
        message: 'Missimg request data'
    })


    // Retrtieve Vehicles From Database
    const eligibleVehicles = await Vehicle.find({ active: true, seats: { $gte: passengers } });


    // Convert Distance To Miles
    const distance = Math.ceil(meters / 1609.34);


    // Geocode Locations
    const geocoded = {};
    await Promise.all([
        geocode(origin).then(data => geocoded.origin = data),
        geocode(destination).then(data => geocoded.destination = data)
    ]);


    // Check if Zip Codes are Whitelisted
    const isTouristZip = checkZipList(geocoded.origin.zip, geocoded.destination.zip);


    // Get Cost for each Vehicle
    const vehicles = eligibleVehicles.map(vehicle => {
        return { ...vehicle.toObject(), cost: calculateCost(vehicle, distance, isTouristZip) }
    });


    // Create Quote
    const quote = await Quote.create({
        origin,
        destination,
        distance: meters,
        passengers,
        vehicles: vehicles.map(v => ({
            vehicle_id: v._id,
            cost: v.cost.cents
        }))
    })

    
    // Return Response
    res.json({
        status: 'SUCCESS',
        vehicles,
        quote: quote.id
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
exports.createPaymentOLD = async (req, res) => {

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


const getStripeUser = async (user) => {

    // Initialize Mutable variables
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

    return [customer, paymentMethods]

}


exports.createPayment = catchAsync(async (req, res, next) => {

    // Destructure Request Object
    const { user, body: { quote_id, vehicle_id } } = req;

    // Retrieve Quote
    const quote = await Quote.findById(quote_id);

    // Retrieve Vehicle
    const vehicle = quote.vehicles.find(v => v.vehicle_id.toString() === vehicle_id);

    // Handle Errors
    if (!vehicle) throw new Error('No vehicle found!');

    // Retrieve Cost
    const { cost } = vehicle;

    // Retrieve Stripe User
    const [customer, paymentMethods] = await getStripeUser(user);

    // Prepare Payment Intent Data
    const intentData = {
        amount: cost,
        currency: 'USD',
        statement_descriptor: 'Ride Transport',
        payment_method_types: ['card']
    }

    // Append Customer 
    if (customer) intentData.customer = customer.id;

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create(intentData);

    // Send Response
    send(res, {
        status: 'SUCCESS',
        secret: paymentIntent.client_secret,
        paymentMethods,
        cost
    });

});