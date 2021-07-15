// Import Dependencies
const express = require('express');
const data = require('../controllers/dataController');


// Create Router
const router = express.Router();


// Retrieve Booking Data
router.get('/airports', data.getAirports);
router.get('/airlines', data.getAirlines)
router.get('/map', data.getMapData)


// Export Router
module.exports = router;