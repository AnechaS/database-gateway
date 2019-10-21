import database from '../../database';
import * as pg from 'pg';
import * as mysql from 'mysql';
import * as mssql from 'mssql';
import Memory from '../../Memory';

jest.mock('pg');
jest.mock('mysql');
jest.mock('mssql');

jest.mock('../../Memory');

const config = {
    host: 'localhost',
    database: 'database',
    username: 'root',
    password: '1234',
};

describe('Test Database', () => {
    test('Return correct', () => {
        expect(database.driver('Mysql')).toBeDefined();
        expect(database.driver('Postgresql')).toBeDefined();
    });

    test('Return connect success', () => {
        database.driver('Postgresql').connect(config);
        database.driver('Mysql').connect(config);
        database.driver('Mssql').connect(config);

        expect(pg.Pool).toHaveBeenCalledTimes(1);
        expect(mysql.createPool).toHaveBeenCalledTimes(1);
        expect(mssql.ConnectionPool).toHaveBeenCalledTimes(1);
    });

    test('Return not database', () => {
        expect(database.driver).toThrow('Database does not exist');
        expect(() => database.driver('Mongodb')).toThrow('Database does not exist');
    });

    test('Return current driver Mysql', async () => {
        Memory.look.mockImplementation(() => {
            return Promise.resolve({
                id: 1,
                driver: 'Mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'test',
                code: '',
            });
        });

        const db = await database.currentDriver();
        expect(db.constructor.name).toBe('Mysql');

        const query = await db.query('select * from table');
        expect(query).toBeInstanceOf(Array);
    });

    test('Return current driver Postgresql', async () => {
        Memory.look.mockImplementation(() => {
            return Promise.resolve({
                id: 1,
                driver: 'Postgresql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'test',
                code: '',
            });
        });

        const db = await database.currentDriver();
        expect(db.constructor.name).toBe('Postgresql');

        const query = await db.query('select * from table');
        expect(query).toBeInstanceOf(Array);
    });

    test('Return current driver Microsoft SQL', async () => {
        Memory.look.mockImplementation(() => {
            return Promise.resolve({
                id: 1,
                driver: 'Mssql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'test',
                code: '',
            });
        });

        const db = await database.currentDriver();
        expect(db.constructor.name).toBe('Mssql');

        const query = await db.query('select * from table');
        expect(query).toBeInstanceOf(Array);
    });
});
