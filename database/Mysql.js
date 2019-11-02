const mysql = require('mysql');

class Mysql {
    constructor() {
        this.conn = null;
    }

    connect(options) {
        return new Promise((resolve, reject) => {
            const pool = mysql.createPool({
                host: options.host,
                database: options.database,
                user: options.username,
                password: options.password,
                port: options.port,
                charset: 'utf8mb4',
            });

            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                this.conn = connection;

                return resolve(connection);
            });
        });
    }

    query(sql = '') {
        return new Promise((resolve, reject) => {
            if (sql === '') {
                return reject(new Error('Invalid sql is required'));
            }

            if (this.conn === null) {
                return reject(new Error('Connection failure'));
            }

            this.conn.query(sql, (error, results) => {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    }

    disconnect() {
        this.conn = null;
    }
}

module.exports = new Mysql();
