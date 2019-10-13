import Memory from '../Memory';
const { Pool } = require('pg');

const config = {
    driver: 'Postgresql',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'xxxxxx',
    database: 'test',
    code: 'abc',
};

jest.mock('pg');
jest.mock('mysql');

describe('Test Memory', () => {
    test('Return method store', async () => {
        const spy = jest.spyOn(Memory, '_saveConnect').mockImplementation(() => config);

        const result = await Memory.store(config);

        expect(spy).toHaveBeenCalled();

        expect(Pool).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expect.objectContaining(config));

        spy.mockRestore();
    });
});

/* test('Return method look', async () => {
    const result = await Memory.lookConnect();
    expect(result).toEqual(expect.objectContaining(config));
}); */

/* test('Return method query simple', async () => {
    try {
        const result = await Connection.query('SELECT * FROM table');

        expect(Pool).toHaveBeenCalledTimes(2);
        expect(result).not.toBeUndefined();
    } catch (error) {
        expect(error).toThrow();
    }
}); */
