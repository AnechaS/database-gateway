import React from 'react';
import ConnectPage from '../../renderer/components/ConnectPage';
import renderer from 'react-test-renderer';

jest.mock('electron');

test('renders correctly', () => {
    renderer.create(<ConnectPage />);
});
