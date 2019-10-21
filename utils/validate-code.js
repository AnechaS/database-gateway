const requestPromise = require('./request-promise');
const config = require('../config');

module.exports = async function(val) {
    const req = await requestPromise({
        method: 'GET',
        uri: `${config.APP_URL}/available/${val}`,
        json: true,
    });

    return req.body.isAvailable;
};
