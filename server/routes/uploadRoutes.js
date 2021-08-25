// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const upload = require('../controllers/uploadController');


// 2. Create Router
const router = express.Router();

router.post('/profile-photo', upload.photo, upload.processProfilePhoto);

// Restrict Routes
router.use(auth.restrictTo('admin'));
router.post('/vehicle', upload.photo, upload.processVehiclePhoto);

module.exports = router;

