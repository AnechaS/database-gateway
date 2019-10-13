const mysql = require('mysql');

class Mysql {
    connect(options) {
        return new Promise((resolve, reject) => {
            const db = mysql.createPool({
                host: options.host,
                database: options.database,
                user: options.username,
                password: options.password,
                port: options.port,
            });

            db.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                return resolve(connection);
            });
        });
    }
}

module.exports = new Mysql();
