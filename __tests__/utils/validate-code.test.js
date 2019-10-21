import validateCode from '../../utils/validate-code';
import request from 'request';

jest.mock('request');

describe('Test validate code client', () => {
    test('Return code available True', async () => {
        request.mockImplementation((o, cbf) => cbf(null, { body: { isAvailable: true } }));
        await expect(validateCode('123456')).resolves.toBe(true);
    });

    test('Return code available False', async () => {
        request.mockImplementation((o, cbf) => cbf(null, { body: { isAvailable: false } }));
        await expect(validateCode('123456')).resolves.toBe(false);
    });

    test('Return request failure', async () => {
        request.mockImplementation((o, cbf) => cbf(new Error('Request failure'), {}));
        await expect(validateCode('123456')).rejects.toThrow();
    });
});
