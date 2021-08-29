const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    service_type: String,
    flight: {
        number: String,
        airline: String,
        type: { type: String },
        time: String,
        buffer: Number,
        airport: String
    },
    cruise: {
        ship: String,
        line: String,
        type: { type: String },
        time: String,
        buffer: Number,
        port: String
    },
    origin: {
        placeId: String,
        name: String,
        address: String
    },
    destination: {
        placeId: String,
        name: String,
        address: String
    },
    schedule: {
        pickup: String,
        dropoff: String
    },
    route: {
        distance: String,
        eta: String
    },
    passengers: {
        total: Number,
        frontSeats: Number,
        rearSeats: Number,
        boosterSeats: Number
    },
    vehicle: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle'
    },
    notes: String,
    quote: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quote'
    },
    payment: {
        intent: String,
        status:{
            type: String,
            enum: ['pending', 'paid', 'refunded']
        },
        method: {
            brand: String,
            last4: String,
            stripe_id: String,
            wallet: String
        },
        total: Number,
        sub_total: Number,
        credits_total: Number,
        applied_credits: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Credit'
        }],
        billing: {
            name: String,
            zip: String
        },
        refund: {
            id: String,
            status: String,
            amount: Number,
            date: String
        }
    },
    code: String,
    status: {
        type: String,
        enum: ['pending', 'ready', 'complete', 'cancelled']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});


// Virtual Populate
// schema.virtual('reviews', {
//     ref: 'Review',
//     foreignField: 'tour',
//     localField: '_id'
// });


// Create And Export Model
const Reservation = mongoose.model('Reservation', schema);
module.exports = Reservation;