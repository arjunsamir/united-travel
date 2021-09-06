const express = require('express');
const Views = require('../controllers/viewController');
const auth = require('../controllers/auth');


const render = (views, page) => {
    return (req, res) => views[page](req, res);
};


module.exports = lang => {

    // Language Prefix
    const prefix = lang === 'es' ? '/es' : '';

    // Initialize Views & Router
    const views = new Views(lang);
    const router = express.Router();

    // Apply Middleware
    router.use(auth.screen);

    // Core Routes
    router.get('/', render(views, 'home'));
    router.get('/about', render(views, 'about'));
    router.get('/services', render(views, 'services'));
    router.get('/fleet', render(views, 'fleet'));
    router.get('/book', render(views, 'book'));
    router.get('/contact', render(views, 'contact'));

    // Account Routes
    router.get('/login', auth.redirect(`${prefix}/`, 'logged-in'), render(views, 'login'));
    router.get('/signup', auth.redirect(`${prefix}/`, 'logged-in'), render(views, 'login'));
    router.get('/account',
        auth.redirect(`${prefix}/login`, 'logged-out'),
        render(views, 'account')
    );
    router.get('/account/reservations/:code',
        auth.redirectReservation(`${prefix}/login`, 'logged-out'),
        render(views, 'reservation')
    );
    router.get('/reservations/:code',
        auth.redirectReservation(`${prefix}/login`, 'logged-out'),
        render(views, 'reservation')
    );

    // Supplemental Routes
    router.get('/privacy', render(views, 'privacy'));
    router.get('/terms', render(views, 'terms'));
    router.get('/navbar', render(views, 'navbar'));
    
    // Admin Routes
    router.get('/admin', auth.screen, auth.restrictAndRedirect(`${prefix}/login`, 'admin'), render(views, 'admin'));
    
    return router;

}