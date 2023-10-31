/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Panel from './Panel';

const panel = (
  <Provider store={store}>
    <BrowserRouter>
      <Panel />
    </BrowserRouter>
  </Provider>
);

jest.mock('chrome');
describe('Panel tests', function () {
  // I get a "chrome is not defined" error for some reason without this ???
  beforeEach(async () => {
    await act(async () => render(panel));
  });

  afterEach(cleanup);

  it('Successfully loads component data', () => {
    const app = screen.getByText('App');
    expect(app).toBeInTheDocument();
  });

  it('Matches the snapshot', () => {
    const element = screen.getByTestId('panel');
    expect(element).toMatchSnapshot();
  });

  it('Expands the child components', async () => {
    const rootContainer = screen.getByTestId('root-container');
    const expandButton = screen.getByTestId('expand-button');
    expect(expandButton).not.toBeNull();
    if (!expandButton) return;
    console.log('rootContainer', rootContainer.innerHTML);
    await userEvent.click(expandButton);
    console.log('rootContainer', rootContainer.innerHTML);
  });
});
