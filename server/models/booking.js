const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Paid', 'Cancelled', 'Refunded', 'Completed']
    },
    schedule: {
        pickup: Date,
        dropoff: Date
    },
    origin: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        placeId: String,
        coordinates: [Number],
        address: String
    },
    destination: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        placeId: String,
        coordinates: [Number],
        address: String
    },
    route: {
        distance: Number,
        eta: String
    },
    airportRide: Boolean,
    flight: {
        type: {
            type: String,
            enum: ['Arriving', 'Departing']
        },
        number: String,
        airline: String,
        airport: {
            code: String,
            name: String
        }
    },
    passengers: {
        total: Number,
        adults: {
            type: Number,
            default: 0
        },
        children: {
            type: Number,
            default: 0
        },
        infants: {
            type: Number,
            default: 0
        }
    },
    luggage: {
        total: Number,
        small: {
            type: Number,
            default: 0
        },
        medium: {
            type: Number,
            default: 0
        },
        large: {
            type: Number,
            default: 0
        }
    },
    vehicle: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle'
    },
    payment: {
        method: {
            type: String,
            enum: ['Card', 'PayPal', 'Cash']
        },
        appliedCredit: {
            type: mongoose.Schema.ObjectId,
            ref: 'Credit'
        },
        total: Number,
        paid: {
            type: Number,
            default: 0
        }
    }
});


// Virtual Populate
schema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});


// Create And Export Model
const Booking = mongoose.model('Booking', schema);
module.exports = Booking;