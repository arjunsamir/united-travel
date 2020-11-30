const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    expirationDate: {
        type: Date,
        required: [true, 'Credits must have an expiration date'],
        default: Date.now() + (1000 * 60 * 60 * 24 * 366)
    },
    value: {
        type: Number,
        required: [true, 'A credit value is required']
    },
    description: {
        type: String,
        required: [true, 'A credit must have a description']
    },
    status: {
        type: String,
        enum: ['pending', 'valid', 'expired', 'redeemed'],
        default: 'valid'
    },
    creditRef: {
        type: mongoose.Schema.ObjectId,
        ref: 'Credit'
    },
    userRef: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});


// Create And Export Model
const Credit = mongoose.model('Credit', schema);
module.exports = Credit;