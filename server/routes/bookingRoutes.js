// Import Dependencies
const express = require('express');
const controller = require('../controllers/bookingController');
const auth = require('../controllers/auth');


// Create Router
const router = express.Router();

router.post('/quote', controller.getQuote);
router.post('/create-payment', auth.screen, controller.createPayment);
router.post('/confirm-payment', controller.confirmPayment);

module.exports = router;