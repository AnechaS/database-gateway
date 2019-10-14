const Postgresql = require('./Postgresql');
const Mysql = require('./Mysql');
const Memory = require('../Memory');

const dbs = { Postgresql, Mysql };

exports.driver = function(string) {
    if (!dbs.hasOwnProperty(string)) {
        throw new Error('Database does not exist');
    }

    return dbs[string];
};

exports.currentDriver = async function() {
    const options = await Memory.lookConnect();
    if (!dbs.hasOwnProperty(options.driver)) {
        throw new Error('Database does not exist');
    }

    const db = dbs[options.driver];

    await db.connect(options);

    return db;
};
