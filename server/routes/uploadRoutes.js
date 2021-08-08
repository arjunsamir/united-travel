// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const upload = require('../controllers/uploadController');


// 2. Create Router
const router = express.Router();

router.post('/profile-photo', upload.userPhoto, upload.resize);

// Restrict Routes
router.use(auth.restrictTo('admin'));
router.post('/vehicle', upload.vehiclePhoto, upload.completeVehicleUpload);

module.exports = router;

