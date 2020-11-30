// 1. Import Dependencies
const express = require('express');
const send = require('../utils/sendResponse');
const auth = require('../controllers/auth');
const user = require('../controllers/userController');


// 2. Create Router
const router = express.Router();


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