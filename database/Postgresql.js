const { Pool } = require('pg');

class Postgresql {
    constructor() {
        this.conn = null;
    }

    connect(options) {
        const db = new Pool({
            host: options.host,
            database: options.database,
            user: options.username,
            password: options.password,
            port: options.port || 5334,
        });

        return db.connect().then(client => {
            this.conn = client;

            return client;
        });
    }

    async query(sql = '') {
        if (sql === '') {
            throw new Error('Invalid sql is required');
        }

        if (this.conn === null) {
            throw new Error('Connection failure');
        }

        const result = await this.conn.query(sql);

        return result.rows;
    }

    disconnect() {
        this.conn = null;
    }
}

module.exports = new Postgresql();
