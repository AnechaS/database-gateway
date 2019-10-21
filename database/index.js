const Postgresql = require('./Postgresql');
const Mysql = require('./Mysql');
const Mssql = require('./Mssql');
const Memory = require('../Memory');

const dbs = { Postgresql, Mysql, Mssql };

exports.driver = function(string) {
    if (!dbs.hasOwnProperty(string)) {
        throw new Error('Database does not exist');
    }

    return dbs[string];
};

exports.currentDriver = async function() {
    const options = await Memory.look();
    if (!dbs.hasOwnProperty(options.driver)) {
        throw new Error('Database does not exist');
    }

    const db = dbs[options.driver];

    await db.connect(options);

    return db;
};
