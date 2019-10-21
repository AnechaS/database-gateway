export const Pool = jest.fn().mockImplementation(() => {
    return {
        connect: jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({ rows: [{ name: 'Cat' }, { name: 'Bat' }] }),
        }),
    };
});
