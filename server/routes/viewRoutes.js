const express = require('express');
const Views = require('../controllers/viewController');
const auth = require('../controllers/auth');


const render = (views, page) => {
    return (req, res) => views[page](req, res);
}


module.exports = lang => {

    const views = new Views(lang);

    const router = express.Router();

    router.get('/', render(views, 'home'));
    router.get('/about', render(views, 'about'));
    router.get('/services', render(views, 'services'));
    router.get('/fleet', render(views, 'fleet'));
    router.get('/reviews', views.reviews);

    // Auth Pages
    router.get('/login', auth.isLoggedIn, views.login);
    router.get('/create-account', auth.isLoggedIn, views.signup);

    // 404 PAGE
    router.get('/lost-traveller', views.lost);
    router.get('/reset-password', views.resetPassword);

    router.get('/write-review', auth.protect, views.writeReview);
    router.get('/me', auth.protect, views.account);
    router.get('/book', render(views, 'booking'));

    return router;

}