const request = require('request');

module.exports = function(option) {
    return new Promise((resolve, reject) => {
        request(option, (error, response) => {
            if (error) {
                return reject(error);
            }

            return resolve(response);
        });
    });
};
