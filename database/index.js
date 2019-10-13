const Postgresql = require('./Postgresql');
const Mysql = require('./Mysql');

module.exports = function(driver) {
    const dbs = { Postgresql, Mysql };
    if (!dbs.hasOwnProperty(driver)) {
        throw new Error('Database does not exist');
    }

    return dbs[driver];
};
