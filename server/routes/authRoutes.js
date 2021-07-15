// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');


// 2. Create Router
const router = express.Router();


// 3. Define Public Routes
router.post('/', auth.validateSession);
router.post('/check-email', auth.checkEmail);
router.post('/register', auth.createAccount);
router.post('/create-session', auth.login);
router.post('/google', auth.continueWithGoogle);
router.post('/facebook', auth.continueWithFacebook);
router.get('/revoke-session', auth.logout);
router.post('/request-reset-token', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);


// 4. Export Router
module.exports = router;