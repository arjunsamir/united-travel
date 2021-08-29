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
        rate: {
            type: Number,
            default: 75
        },
        minHours: {
            type: Number,
            default: 3
        }
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
    },
    contact: {
        email: String,
        notificationEmail: String,
        phone: String
    }
});


// Create And Export Model
const Settings = mongoose.model('Settings', schema);
module.exports = Settings;