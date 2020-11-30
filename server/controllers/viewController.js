const send = require('../utils/sendResponse');

exports.lostPage = (req, res) => send(res, '404.html', 404);
exports.loginPage = (req, res) => send(res, 'login.html');
exports.signupPage = (req, res) => send(res, 'signup.html');
exports.resetPassword = (req, res) => send(res, 'reset-password.html');
exports.writeReview = (req, res) => send(res, 'review.html');
exports.bookingPage = (req, res) => send(res, 'booking.html');
exports.myAccount = (req, res) => send(res, 'my-account.html');

exports.homePage = (req, res) => send(res, 'index.html');
exports.aboutPage = (req, res) => send(res, 'about.html');
exports.servicesPage = (req, res) => send(res, 'services.html');
exports.fleetPage = (req, res) => send(res, 'fleet.html');
exports.reviewsPage = (req, res) => send(res, 'reviews.html');