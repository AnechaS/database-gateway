const sqlite3 = require('sqlite3').verbose();
const database = require('./database');

const sqlite = new sqlite3.Database('./memory.sqlite');

class Memory {
    async store(params) {
        const db = await database(params.driver);
        await db.connect({
            user: params.username,
            host: params.host,
            database: params.database,
            password: params.password,
            port: params.port,
        });

        return this._saveConnect([
            params.driver,
            params.host,
            params.port,
            params.username,
            params.password,
            params.database,
            params.code,
        ]);
    }

    _saveConnect(values) {
        return new Promise(resolve => {
            const sqlTableQuery = `
                    SELECT name FROM sqlite_master
                    WHERE type='table' AND name='connection' OR name='macths'
                `;
            sqlite.all(sqlTableQuery, (err, row) => {
                sqlite.serialize(async () => {
                    if (row.length) {
                        values.push(1);
                        this._updateConnect(values);
                    } else {
                        this._createTableConnect();
                        this._createConnect(values);
                    }

                    const result = await this.lookConnect();
                    return resolve(result);
                });
            });
        });
    }

    _createConnect(values) {
        const sqlInsert = `
            INSERT INTO connection (
                driver,
                host,
                port,
                username,
                password,
                database,
                code
            )
            VALUES (?,?,?,?,?,?,?)
        `;
        sqlite.run(sqlInsert, values);
    }

    _createTableConnect() {
        const sqlCreateTable = `
            CREATE TABLE IF NOT EXISTS connection (
                id integer PRIMARY KEY AUTOINCREMENT,
                driver text,
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

    _updateConnect(values) {
        const sqlUpdate = `
            UPDATE connection
            SET
                driver = (?),
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

    lookConnect() {
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

    // async query(queries) {
    //     const row = await this.look();
    //     const pool = new Pool({
    //         user: row.username,
    //         host: row.host,
    //         database: row.database,
    //         password: row.password,
    //         port: row.port,
    //     });

    //     return pool.query(queries);
    // }
}

module.exports = new Memory();
