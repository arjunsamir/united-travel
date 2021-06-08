const send = require('../utils/sendResponse');

class Views {

    constructor(lang) {
        this.lang = lang || 'en';
        this.path = this.lang === 'en' ? '' : `/${this.lang}`;
    }

    home(req, res) {
        this.render(res, 'home');
    }

    about(req, res) {
        this.render(res, 'about');
    }

    services(req, res) {
        this.render(res, 'services');
    }

    fleet(req, res) {
        this.render(res, 'fleet');
    }

    booking(req, res) {
        this.render(res, 'booking');
    }

    reviews(req, res) {
        send(res, 'reviews.html');
    }

    login(req, res) {
        send(res, 'login.html');
    }

    signup(req, res) {
        send(res, 'signup.html');
    }

    account(req, res) {
        send(res, 'my-account.html');
    }

    resetPassword(req, res) {
        send(res, 'reset-password.html');
    }

    writeReview(req, res) {
        send(res, 'review.html');
    }

    lost() {
        send(res, '404.html', 404);
    }

    render(res, page, data = {}) {
        res.render(`pages/${page}`, {
            lang: this.lang,
            path: this.path,
            data
        })
    }

}

module.exports = Views;