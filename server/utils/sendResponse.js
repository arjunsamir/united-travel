const path = require('path');

module.exports = (res, content, status = 200) => {
    if (typeof content === 'object' && content !== null) res.status(status).json(content);
    else if (content.endsWith('.html')) res.status(status).sendFile(path.join(__dirname, `../../client/dist/${content}`));
    else res.status(status).send(content);
}