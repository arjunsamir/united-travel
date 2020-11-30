const rest = require('../utils/restful');
const Review = require('../models/review');


exports.createReview = rest.createOne(Review);
exports.getAllReviews = rest.getAll(Review);
exports.getReview = rest.getOne(Review);
exports.updateReview = rest.updateOne(Review);
exports.deleteReview = rest.deleteOne(Review);