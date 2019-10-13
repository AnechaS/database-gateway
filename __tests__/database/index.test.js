import database from '../../database';
import { Pool } from 'pg';
import { createPool } from 'mysql';


jest.mock('pg');
jest.mock('mysql');

const config = {
    host: 'localhost',
    database: 'database',
    username: 'root',
    password: '1234',
};

describe('Test Database', () => {
    test('Return correct', () => {
        expect(database('Mysql')).toBeDefined();
        expect(database('Postgresql')).toBeDefined();
    });
    test('Return connect success', () => {
        database('Postgresql').connect(config);
        database('Mysql').connect(config);

        expect(Pool).toHaveBeenCalledTimes(1);
        expect(createPool).toHaveBeenCalledTimes(1);
    });

    test('Return not database', () => {
        expect(database).toThrow('Database does not exist');
        expect(() => database('Mongodb')).toThrow('Database does not exist');
    });
});
