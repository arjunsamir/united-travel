// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const admin = require('../controllers/adminController');

// 2. Create Router
const router = express.Router();


router.get('/settings', admin.getSettings);


// Limit Changes TO ADMIN Enable this in production
if (process.env.NODE_ENV === 'production') {
    router.use(auth.protect, auth.restrictTo('admin'));
}

router.post('/settings', admin.updateSettings);
router.get('/settings/history', admin.getSettingsHistory);


module.exports = router;