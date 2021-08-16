const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: true
    },
    charter: {
        rate: Number,
        minHours: Number
    },
    thresholds: {
        extended: Number,
        tourist: Number,
    },
    referrals: {
        recruiter: {
            bonus: Number,
            expiration: Number
        },
        candidate: {
            bonus: Number,
            expiration: Number
        }
    },
    baseMpg: Number,
    touristZips: [String]
});


// Create And Export Model
const Settings = mongoose.model('Settings', schema);
module.exports = Settings;