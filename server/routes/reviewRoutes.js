// Import Dependencies
const express = require('express');
const send = require('../utils/sendResponse');
const ctrl = require('../controllers/reviewController');


// Create Router
const router = express.Router();

// router.use(auth.protect, auth.restrictTo('admin'));

router.route('/')
    .get(ctrl.getAllReviews)
    .post(ctrl.createReview)
;

router.route('/:id')
    .get(ctrl.getReview)
    .patch(ctrl.updateReview)
    .delete(ctrl.deleteReview)
;


module.exports = router;