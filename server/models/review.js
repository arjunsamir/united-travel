const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'A review body is required']
    },
    rating: {
        type: String,
        required: [true, 'A rating is required'],
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Ratings cannot be greater than 5.0']
    },
    author: {
        type: String,
        required: [true, 'Review must have an author']
    },
    title: {
        type: String,
        required: [true, 'Review must have a title'],
        default: 'Lorem Ipsum Set Dolor'
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    photo: {
        type: String,
        default: '/img/profile-photos/juan.jpg'
    },
    locale: {
        type: String,
        default: 'en'
    },
    active: {
        type: Boolean,
        default: true
    }
});


// Create And Export Model
const Review = mongoose.model('Review', schema);
module.exports = Review;