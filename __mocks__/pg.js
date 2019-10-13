export const Pool = jest.fn().mockImplementation(() => {
    return {
        connect: jest.fn().mockImplementation(() => Promise.resolve({})),
    };
});
