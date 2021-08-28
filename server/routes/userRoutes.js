// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const user = require('../controllers/userController');

// 2. Create Router
const router = express.Router();

// Unprotected Routes
router.get('/referrals/:code', user.getUserByCode);
router.patch('/me', auth.getUserIdFromJWT, user.updateMe);


// Admin Restricted Routes
router.use(auth.protect, auth.restrictTo('admin'));
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