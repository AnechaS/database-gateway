import * as sql from 'mysql';
import Mysql from '../../database/Mysql';

jest.mock('mysql');

const config = {
    host: 'localhost',
    database: 'database',
    username: 'root',
    password: '1234',
};

describe('Test Mysql', () => {
    test('Return correct connect', async () => {
        await Mysql.connect(config);
        expect(sql.createPool).toHaveBeenCalledTimes(1);
    });

    test('Return correct query', async () => {
        await Mysql.connect(config);
        expect(sql.createPool).toHaveBeenCalledTimes(2);

        await expect(Mysql.query('select * from table')).resolves.toBeInstanceOf(Array);
    });

    test('Return error query', async () => {
        // not sql parame
        await expect(Mysql.query()).rejects.toThrow('Invalid sql is required');
        // not connect
        Mysql.disconnect();
        await expect(Mysql.query('select * from table')).rejects.toThrow('Connection failure');
    });
});
