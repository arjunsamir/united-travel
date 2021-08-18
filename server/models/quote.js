const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    vehicles: [{
        vehicle_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Vehicle'
        },
        cost: Number
    }],
    created_at: {
        type: Date,
        default: Date.now(),
        select: false
    }
});


// Create And Export Model
const Quote = mongoose.model('Quote', schema);
module.exports = Quote;