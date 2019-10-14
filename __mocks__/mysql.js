export const createPool = jest.fn().mockImplementation(() => {
    return {
        getConnection: cbf =>
            cbf(null, {
                query: (sql, subCbf) => subCbf(null, [{ name: 'Cat' }, { name: 'Bat' }]),
            }),
    };
});
