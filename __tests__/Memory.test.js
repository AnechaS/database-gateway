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

jest.spyOn(Memory, '_updateConnect').mockImplementation(() => jest.fn());
jest.spyOn(Memory, '_createTableConnect').mockImplementation(() => jest.fn());
jest.spyOn(Memory, 'lookConnect').mockImplementation(() => Promise.resolve(config));

describe('Test Memory', () => {
    test('Return method store', async () => {
        const result = await Memory.store(config);
        expect(result).toEqual(expect.objectContaining(config));
    });
});

test('Return method look', async () => {
    const result = await Memory.lookConnect();
    expect(result).toEqual(expect.objectContaining(config));
});
