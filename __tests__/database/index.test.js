import database from '../../database';
import { Pool } from 'pg';
import { createPool } from 'mysql';
import Memory from '../../Memory';

jest.mock('pg');
jest.mock('mysql');
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

        expect(Pool).toHaveBeenCalledTimes(1);
        expect(createPool).toHaveBeenCalledTimes(1);
    });

    test('Return not database', () => {
        expect(database.driver).toThrow('Database does not exist');
        expect(() => database.driver('Mongodb')).toThrow('Database does not exist');
    });

    test('Return current driver Mysql', async () => {
        Memory.lookConnect.mockImplementation(() => {
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
        Memory.lookConnect.mockImplementation(() => {
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
});
