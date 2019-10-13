export const createPool = jest.fn().mockImplementation(() => {
    return {
        getConnection: (cbf) => cbf(null, {}),
    };
});
