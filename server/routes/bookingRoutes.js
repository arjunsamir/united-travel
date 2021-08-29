// Import Dependencies
const express = require('express');
const controller = require('../controllers/bookingController');
const auth = require('../controllers/auth');


// Create Router
const router = express.Router();

// Open Routes
router.post('/quote', controller.getQuote);
router.post('/confirm-payment', controller.confirmPayment);

// Protected Routes
router.use(auth.screen);
router.post('/create-payment', controller.createPayment);
router.post('/issue-refund', controller.issueRefund);
router.get('/reservations/users/me', controller.listReservations);
router.get('/reservations/users/me/:code', controller.getReservation);

module.exports = router;