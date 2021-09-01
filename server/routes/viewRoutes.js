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

    const prefix = lang === 'es' ? '/es' : '';

    router.get('/', render(views, 'home'));
    router.get('/about', render(views, 'about'));
    router.get('/services', render(views, 'services'));
    router.get('/fleet', render(views, 'fleet'));
    router.get('/book', render(views, 'book'));
    router.get('/login', auth.redirect(`${prefix}/`, 'logged-in'), render(views, 'login'));
    router.get('/account', auth.redirect(`${prefix}/login`, 'logged-out'), render(views, 'account'));
    router.get('/privacy', render(views, 'privacy'));
    router.get('/terms', render(views, 'terms'));
    router.get('/navbar', render(views, 'navbar'));
    router.get('/reservations/:code', render(views, 'reservation'))
    router.get('/admin', auth.screen, auth.restrictAndRedirect(`${prefix}/login`, 'admin'), render(views, 'admin'));
    
    return router;

}