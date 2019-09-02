import Connection from '../Connection';
const { Pool } = require('pg');

const mockUserDB = {
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'xxxxxx',
    database: 'test',
    code: 'abc',
};

jest.mock('pg');

test('Return method store simple', async () => {
    // const spy = jest.spyOn(Connection, '_update').mockImplementation(jest.fn());

    const result = await Connection.store(mockUserDB);

    expect(Pool).toHaveBeenCalledTimes(1);
    // expect(spy).toHaveBeenCalled();
    expect(result).toEqual(
        expect.objectContaining({
            host: mockUserDB.host,
            port: mockUserDB.port,
            username: mockUserDB.username,
            password: mockUserDB.password,
            code: mockUserDB.code,
            database: mockUserDB.database,
        })
    );

    // spy.mockRestore();
});

test('Return method look simple', async () => {
    const result = await Connection.look();

    expect(result).toEqual(
        expect.objectContaining({
            host: mockUserDB.host,
            port: mockUserDB.port,
            username: mockUserDB.username,
            password: mockUserDB.password,
            code: mockUserDB.code,
            database: mockUserDB.database,
        })
    );
});

test('Return method query simple', async () => {
    try {
        const result = await Connection.query('SELECT * FROM table');

        expect(Pool).toHaveBeenCalledTimes(2);
        expect(result).not.toBeUndefined();
    } catch (error) {
        expect(error).toThrow();
    }
});
