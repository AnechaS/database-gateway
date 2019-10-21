import * as sql from 'pg';
import Postgresql from '../../database/Postgresql';

jest.mock('pg');

const config = {
    host: 'localhost',
    database: 'database',
    username: 'root',
    password: '1234',
};

describe('Test Postgresql', () => {
    test('Return correct connect', async () => {
        await Postgresql.connect(config);
        expect(sql.Pool).toHaveBeenCalledTimes(1);
    });

    test('Return correct query', async () => {
        await Postgresql.connect(config);
        expect(sql.Pool).toHaveBeenCalledTimes(2);

        await expect(Postgresql.query('select * from table')).resolves.toBeInstanceOf(Array);
    });

    test('Return error query', async () => {
        // not sql parame
        await expect(Postgresql.query()).rejects.toThrow('Invalid sql is required');
        // not connect
        Postgresql.disconnect();
        await expect(Postgresql.query('select * from table')).rejects.toThrow('Connection failure');
    });
});
