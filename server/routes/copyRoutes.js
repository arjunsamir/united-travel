// Import Dependencies
const express = require('express');
const control = require('../controllers/copyController');


// Create Router
const router = express.Router();


// Retrieve Booking Data
router.get('/fleet/:locale', control.getFleet);
router.get('/login/:locale', control.getLogin);
router.get('/booking/:locale', control.getBooking);


// Export Router
module.exports = router;