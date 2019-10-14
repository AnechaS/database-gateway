export const ipcRenderer = {
    on: jest.fn(),
    sendSync: jest.fn().mockImplementation(() => undefined),
};

export const remote = {
    dialog: jest.fn(),
};
