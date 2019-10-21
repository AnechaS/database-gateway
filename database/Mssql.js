const mssql = require('mssql');

class Mssql {
    constructor() {
        this.conn = null;
    }

    async connect(options) {
        const pool = new mssql.ConnectionPool({
            server: options.host,
            database: options.database,
            user: options.username,
            password: options.password,
            port: Number(options.port),
        });

        const client = await pool.connect();
        this.conn = client;

        return pool;
    }

    async query(sql = '') {
        if (sql === '') {
            throw new Error('Invalid sql is required');
        }

        if (this.conn === null) {
            throw new Error('Connection failure');
        }

        const result = await this.conn.query(sql);
        return result.recordset;
    }

    disconnect() {
        this.conn = null;
    }
}

module.exports = new Mssql();
