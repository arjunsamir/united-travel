// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const admin = require('../controllers/adminController');
const reservations = require('../controllers/bookingController');

// 2. Create Router
const router = express.Router();


router.get('/settings', admin.getSettings);


// Limit Changes TO ADMIN Enable this in production
router.use(auth.protect, auth.restrictTo('admin'));

router.post('/settings', admin.updateSettings);
router.get('/settings/history', admin.getSettingsHistory);
router.get('/reservations', reservations.getReservations);


module.exports = router;