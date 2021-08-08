// 1. Import Dependencies
const express = require('express');
const auth = require('../controllers/auth');
const user = require('../controllers/userController');
const upload = require('../controllers/uploadController');


// 2. Create Router
const router = express.Router();

router.get('/referrals/:code', user.getUserByCode);

router.use(auth.protect);

router.route('/')
    .get(user.getAll)
    .post(user.createOne)
;


router.use(auth.restrictTo('admin'));

router.route('/:id')
    .get(user.getOne)
    .patch(user.updateOne)
    .delete(user.deleteOne)
;


module.exports = router;