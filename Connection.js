const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');

const sqlite = new sqlite3.Database('./memory.sqlite');

class Connection {
    store(params) {
        return new Promise((resolve, reject) => {
            const pool = new Pool({
                user: params.username,
                host: params.host,
                database: params.database,
                password: params.password,
                port: params.port,
            });

            pool.connect(e => {
                if (e) {
                    return reject(e);
                }

                const sqlTableQuery = `
                    SELECT name FROM sqlite_master
                    WHERE type='table' AND name='connection' OR name='macths'
                `;
                sqlite.all(sqlTableQuery, (err, row) => {
                    sqlite.serialize(async () => {
                        const values = [
                            params.host,
                            params.port,
                            params.username,
                            params.password,
                            params.database,
                            params.code,
                        ];

                        if (row.length) {
                            values.push(1);
                            this._update(values);
                        } else {
                            this._createTable();
                            this._create(values);
                        }

                        const result = await this.look();
                        return resolve(result);
                    });
                });
            });
        });
    }

    _create(values) {
        const sqlInsert = `
            INSERT INTO connection (
                host,
                port,
                username,
                password,
                database,
                code
            )
            VALUES (?,?,?,?,?,?)
        `;
        sqlite.run(sqlInsert, values);
    }

    _createTable() {
        const sqlCreateTable = `
            CREATE TABLE IF NOT EXISTS connection (
                id integer PRIMARY KEY AUTOINCREMENT,
                host text,
                port integer,
                username text,
                password text,
                database text,
                code text
            )
        `;
        sqlite.run(sqlCreateTable);
    }

    _update(values) {
        const sqlUpdate = `
            UPDATE connection
            SET
                host = (?),
                port = (?),
                username = (?),
                password = (?),
                database = (?),
                code = (?)
            WHERE id = (?)
        `;
        sqlite.run(sqlUpdate, values);
    }

    look() {
        return new Promise(resolve => {
            const sqlQuery = `SELECT * FROM connection`;
            sqlite.get(sqlQuery, (err, rows) => {
                let result = null;
                if (!err && typeof rows !== 'undefined') {
                    result = rows;
                }

                resolve(result);
            });
        });
    }

    async query(queries) {
        const row = await this.look();
        const pool = new Pool({
            user: row.username,
            host: row.host,
            database: row.database,
            password: row.password,
            port: row.port,
        });

        return pool.query(queries);
    }
}

module.exports = new Connection();
