module.exports = (obj, ...allowed) => {
    const filteredData = {};
    Object.keys(obj).forEach(key => {
        if (allowed.includes(key)) filteredData[key] = obj[key];
    });
    return filteredData;
}