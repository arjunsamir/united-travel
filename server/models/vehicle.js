const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    make: String,
    model: String,
    year: String,
    seats: Number,
    bags: Number,
    mpg: Number,
    active: {
        type: Boolean,
        default: true
    },
    info_en: {
        name: String,
        description: String,
        features: [String]
    },
    info_es: {
        name: String,
        description: String,
        features: [String]
    },
    thumbnail: String,
    image: String,
    size: {
        type: String,
        enum: ['s', 'm', 'l', 'xl', 'xxl'],
        required: [true, 'A vehicle must have a size class. This is crucial for calculating accurate fares']
    },
    rates: {
        fee: Number,
        base: Number,
        tourist: Number,
        extended: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


// Create And Export Model
const Vehicle = mongoose.model('Vehicle', schema);
module.exports = Vehicle;