const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    expiration: {
        type: Date,
        required: [true, 'Credits must have an expiration date'],
        default: Date.now() + (1000 * 60 * 60 * 24 * 366)
    },
    value: {
        type: Number,
        required: [true, 'A credit value is required']
    },
    status: {
        type: String,
        enum: ['pending', 'valid', 'expired', 'redeemed'],
        default: 'valid'
    },
    sibling: {
        type: mongoose.Schema.ObjectId,
        ref: 'Credit'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});


// Create And Export Model
const Credit = mongoose.model('Credit', schema);
module.exports = Credit;