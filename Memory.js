const sqlite3 = require('sqlite3').verbose();

const sqlite = new sqlite3.Database('./memory.sqlite');

class Memory {
    async store(params) {
        return new Promise(resolve => {
            const values = [
                params.driver,
                params.host,
                params.port,
                params.username,
                params.password,
                params.database,
                params.code,
            ];

            const sqlTableQuery = `
                    SELECT name FROM sqlite_master
                    WHERE type='table' AND name='connection' OR name='macths'
                `;
            sqlite.all(sqlTableQuery, (err, row) => {
                sqlite.serialize(async () => {
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
    }

    _create(values) {
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

    _createTable() {
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

    _update(values) {
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
}

module.exports = new Memory();
