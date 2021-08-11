const express = require('express');
const Views = require('../controllers/viewController');
const auth = require('../controllers/auth');


const render = (views, page) => {
    return (req, res) => views[page](req, res);
}


module.exports = lang => {

    const views = new Views(lang);
    const router = express.Router();

    router.use(auth.screen);

    router.get('/', render(views, 'home'));
    router.get('/about', render(views, 'about'));
    router.get('/services', render(views, 'services'));
    router.get('/fleet', render(views, 'fleet'));
    router.get('/book', render(views, 'book'));
    router.get('/login', auth.isLoggedIn, render(views, 'login'));
    router.get('/account', auth.protect, render(views, 'account'));
    router.get('/privacy', render(views, 'privacy'));
    router.get('/terms', render(views, 'terms'));
    router.get('/navbar', render(views, 'navbar'));
    
    return router;

}