const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    expiration: {
        type: Date,
        required: [true, 'Credits must have an expiration date']
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
    type: {
        type: String,
        enum: ['recruiter', 'candidate']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    dependant: {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        credit: {
            type: mongoose.Schema.ObjectId,
            ref: 'Credit'
        }
    }
});


// Create And Export Model
const Credit = mongoose.model('Credit', schema);
module.exports = Credit;