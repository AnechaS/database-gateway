export const Pool = jest.fn().mockImplementation(() => {
    return {
        connect: callback => callback(null),
        query: jest.fn().mockResolvedValue([
            {
                id: 1,
                name: 'cat',
            },
        ]),
    };
});
