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
            expiration: Number // In Days
        },
        candidate: {
            bonus: Number,
            expiration: Number // In Days
        }
    },
    baseMpg: Number,
    touristZips: [String],
    cancellation: {
        allowed: Boolean,
        hoursBefore: Number,
        fees: {
            flat: Number,
            percent: Number
        }
    }
});


// Create And Export Model
const Settings = mongoose.model('Settings', schema);
module.exports = Settings;