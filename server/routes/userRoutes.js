// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const user = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');

// 2. Create Router
const router = express.Router();

// Unprotected Routes
router.get('/referrals/:code', user.getUserByCode);
router.patch('/me', auth.getUserIdFromJWT, user.updateMe);

// Create Rout
router.use(auth.protect);
router.get('/me/payment-methods', bookingController.listPaymentMethods);
router.delete('/me/payment-methods/:method', bookingController.deletePaymentMethod);


// Admin Restricted Routes
router.use(auth.restrictTo('admin'));
router.route('/')
    .get(user.getAll)
    .post(user.createOne)
;
router.route('/:id')
    .get(user.getOne)
    .patch(user.updateOne)
    .delete(user.deleteOne)
;


module.exports = router;