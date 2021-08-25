const fs = require('fs');

const rawdata = fs.readFileSync('./airlines-original.json', 'utf8')

if (!rawdata) process.exit()

const data = JSON.parse(rawdata);

const airlines = {};

const regex = /^[a-z0-9]+$/i;

Object.entries(data).forEach(([key, airline]) => {
    const first = airline[0].toLowerCase();

    if (!regex.test(first)) return;

    if (!airlines[first]) airlines[first] = []

    airlines[first].push(airline)

})

fs.writeFileSync('./airlines.json', JSON.stringify(airlines));
