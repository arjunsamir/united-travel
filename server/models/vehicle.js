const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'A vehichle must have a make']
    },
    model: {
        type: String,
        required: [true, 'A vehicle must have a model']
    },
    year: {
        type: Number,
        required: [true, 'A vehicle must have a year']
    },
    capacity: {
        type: Number,
        required: [true, 'A vehicle must have a passenger capacity. This is crucial for producing accurate options for users']
    },
    mpg: {
        type: Number,
        required: [true, 'A vehicle must have a fuel economy. This is crucial for calculating accurate fares']
    },
    class: {
        type: String,
        enum: ['sm', 'md', 'lg', 'xl'],
        required: [true, 'A vehicle must have a size class. This is crucial for calculating accurate fares']
    },
    photo: String,
    photos: [String]
});


// let cars = {
//     mercedes_e350_2013: {
//         make: 'Mercedes',
//         model: 'e350',
//         year: 2013,
//         passengers: 3,
//         mpg: 25,
//         class: 'sm'
//     },
//     mercedes_sprinter_2015: {
//         make: 'Mercedes',
//         model: 'Sprinter',
//         year: 2014,
//         passengers: 11,
//         mpg: 20,
//         class: 'lg'
//     },
//     ford_transit: {
//         make: 'Ford',
//         model: 'Transit',
//         year: 2016,
//         passengers: 14,
//         mpg: 16,
//         class: 'xl'
//     },
//     chevrolet_suburban: {
//         make: 'Chevrolet',
//         model: 'Suburban',
//         year: 2018,
//         passengers: 7,
//         mpg: 20,
//         class: 'md'
//     }
// }

// Create And Export Model
const Vehicle = mongoose.model('Vehicle', schema);
module.exports = Vehicle;