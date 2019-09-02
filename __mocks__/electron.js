export const ipcRenderer = {
    on: jest.fn(),
    sendSync: jest.fn().mockImplementation(() => undefined),
};
