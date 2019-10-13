const { Pool } = require('pg');

class Postgresql {
    connect(options) {
        const db = new Pool({
            host: options.host,
            database: options.database,
            user: options.username,
            password: options.password,
            port: options.port || 5334,
        });

        return db.connect().then(client => {
            return client;
        });
    }
}

module.exports = new Postgresql();
