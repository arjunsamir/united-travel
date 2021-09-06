// Import Dependencies
const express = require('express');
const ctrl = require('../controllers/reviewController');
const auth = require('../controllers/auth');

// Create Router
const router = express.Router();

// Unprotected Routes
router.get('/', ctrl.getAllReviews);
router.get('/:id', ctrl.getReview);

// Protected Routes
router.use(auth.protect, auth.restrictTo('admin'));
router.post('/', ctrl.createReview);
router.route('/:id')
    .patch(ctrl.updateReview)
    .delete(ctrl.deleteReview)
;

// Export Router
module.exports = router;