const fetchPromise = require('./fetch-promise');
const config = require('../config');

module.exports = async function(val) {
    const req = await fetchPromise({
        method: 'GET',
        uri: `${config.APP_URL}/available/${val}`,
        json: true,
    });

    return req.body.isAvailable;
};
