const path = require('path');

const getPath = (page, locale) => {
    return `../../client/views/src/locale/templates/${page}/${page}.${locale}.json`
}

exports.getFleet = (req, res) => {
    res.sendFile(path.join(__dirname, getPath('fleet', req.params.locale)))
}