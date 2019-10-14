export const Pool = jest.fn().mockImplementation(() => {
    return {
        connect: jest.fn().mockImplementation(() =>
            Promise.resolve({
                query: () => ({ rows: [{ name: 'Cat' }, { name: 'Bat' }] }),
            })
        ),
    };
});
