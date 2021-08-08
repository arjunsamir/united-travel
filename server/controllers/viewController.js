
class Views {

    constructor(lang) {
        this.lang = lang || 'en';
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

    login(req, res) {
        this.render(res, 'login');
    }

    account(req, res) {
        this.render(res, 'account');
    }

    privacy(req, res) {
        this.render(res, 'privacy');
    }

    terms(req, res) {
        this.render(res, 'terms');
    }

    async render(res, page, data = {}) {
        if (!res.locals.user) res.locals.user = {};
        res.render(`${this.lang}/${page}`, { ...data })
    }

}

module.exports = Views;