export const ConnectionPool = jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue({
        query: jest.fn().mockResolvedValue({
            recordsets: [[{ name: 'Cat' }, { name: 'Bat' }]],
            recordset: [{ name: 'Cat' }, { name: 'Bat' }],
            output: {},
            rowsAffected: [2],
        }),
    }),
}));
