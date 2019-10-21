import * as sql from 'mssql';
import Mssql from '../../database/Mssql';

jest.mock('mssql');

const config = {
    host: 'localhost',
    database: 'database',
    username: 'root',
    password: '1234',
};

describe('Test Microsoft SQL', () => {
    test('Return correct connect', async () => {
        await Mssql.connect(config);
        expect(sql.ConnectionPool).toHaveBeenCalledTimes(1);
    });

    test('Return correct query', async () => {
        await Mssql.connect(config);
        expect(sql.ConnectionPool).toHaveBeenCalledTimes(2);

        await expect(Mssql.query('select * from table')).resolves.toBeInstanceOf(Array);
    });

    test('Return error query', async () => {
        // not sql parame
        await expect(Mssql.query()).rejects.toThrow('Invalid sql is required');
        // not connect
        Mssql.disconnect();
        await expect(Mssql.query('select * from table')).rejects.toThrow('Connection failure');
    });
});
