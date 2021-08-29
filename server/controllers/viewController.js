const Settings = require('../models/settings');


class Views {

    constructor(lang) {
        this.lang = lang || 'en';
    }

    async getSettings() {

        this.settings = await Settings.findOne({ active: true });
        this.expiration = Date.now() + (60000 * 30);
        this.year = new Date().getFullYear();

    }

    formatPhoneNumber(num) {
        return num.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
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

    book(req, res) {
        this.render(res, 'book');
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

    navbar(req, res) {
        this.render(res, 'navbar');
    }

    async reservation(req, res) {
        this.render(res, 'reservation', {
            confirmationCode: (req.params.code || "").toLowerCase()
        });
    }

    async render(res, page, data = {}) {

        if (!this.settings || Date.now() > this.expiration) await this.getSettings();

        // Set Settings Locals
        res.locals.settings = {
            referrals: this.settings.referrals,
            cancellation: this.settings.cancellation,
            contact: this.settings.contact || {},
            phone: this.formatPhoneNumber(this.settings.contact.phone),
            copyrightYear: this.year
        }

        // Set User On Locals
        if (!res.locals.user) res.locals.user = {};

        res.render(`${this.lang}/${page}`, { ...data })
    }

}

module.exports = Views;