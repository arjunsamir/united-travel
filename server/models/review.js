const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'A review body is required'],
        trim: ture
    },
    rating: {
        type: String,
        required: [true, 'A rating is required'],
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Ratings cannot be greater than 5.0']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
        required: [true, 'Review must have an author']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must have an author']
    }
});


// Create And Export Model
const Review = mongoose.model('Review', schema);
module.exports = Review;