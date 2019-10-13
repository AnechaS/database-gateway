import { createPool } from 'mysql';
import Mysql from '../../database/Mysql';

jest.mock('mysql');

const config = {
    host: 'localhost',
    database: 'database',
    username: 'root',
    password: '1234',
};

describe('Test Postgresql', () => {
    test('Return correct connect', async () => {
        await Mysql.connect(config);
        expect(createPool).toHaveBeenCalledTimes(1);
    });
});
