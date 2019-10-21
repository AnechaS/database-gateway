import Memory from '../Memory';

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
jest.mock('mssql');

jest.spyOn(Memory, '_update').mockImplementation(() => jest.fn());
jest.spyOn(Memory, '_createTable').mockImplementation(() => jest.fn());
jest.spyOn(Memory, '_create').mockImplementation(() => jest.fn());
jest.spyOn(Memory, 'look').mockImplementation(() => Promise.resolve(config));

describe('Test Memory', () => {
    test('Return method store', async () => {
        const result = await Memory.store(config);
        expect(result).toEqual(expect.objectContaining(config));
    });
});

test('Return method look', async () => {
    const result = await Memory.look();
    expect(result).toEqual(expect.objectContaining(config));
});
