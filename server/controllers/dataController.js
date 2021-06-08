const path = require('path');

exports.getAirports = (req, res) => {
    res.sendFile(path.join(__dirname, '../data/aviation/airports.json'))
}

exports.getAirlines = (req, res) => {
    res.sendFile(path.join(__dirname, '../data/aviation/airlines.json'))
}

exports.getMapTheme = (req, res) => {
    res.sendFile(path.join(__dirname, '../data/themes/map-dark.json'))
}