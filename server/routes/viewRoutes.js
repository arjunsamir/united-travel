const express = require('express');
const control = require('../controllers/viewController');
const auth = require('../controllers/auth');


const router = express.Router();

router.get('/', control.homePage);
router.get('/about', control.aboutPage);
router.get('/services', control.servicesPage);
router.get('/fleet', control.fleetPage);
router.get('/reviews', control.reviewsPage);

// Auth Pages
router.get('/login', auth.isLoggedIn, control.loginPage);
router.get('/create-account', auth.isLoggedIn, control.signupPage);

// 404 PAGE
router.get('/lost-traveller', control.lostPage);
router.get('/reset-password', control.resetPassword);

router.get('/write-review', auth.protect, control.writeReview);
router.get('/me', auth.protect, control.myAccount);
router.get('/book', control.bookingPage);

module.exports = router;