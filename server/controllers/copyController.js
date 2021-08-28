const path = require('path');

const getPath = (page, locale) => {
    return `../../client/views/src/locale/templates/${page}/${page}.${locale}.json`
}

exports.getFleet = (req, res) => {
    res.sendFile(path.join(__dirname, getPath('fleet', req.params.locale)))
}

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, getPath('login', req.params.locale)))
}

exports.getBooking = (req, res) => {
    res.sendFile(path.join(__dirname, getPath('book', req.params.locale)))
}

exports.getAccount = (req, res) => {
    res.sendFile(path.join(__dirname, getPath('account', req.params.locale)))
}