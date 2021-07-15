const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    origin: String,
    destination: String,
    distance: Number,
    vehicle: String,
    cost: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});


// Create And Export Model
const Quote = mongoose.model('Quote', schema);
module.exports = Quote;