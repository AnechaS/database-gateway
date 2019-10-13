import { Pool } from 'pg';
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
        expect(Pool).toHaveBeenCalledTimes(1);
    });
});
