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
    const appButton = screen.getByTestId('expand-button-App');
    expect(appButton).not.toBeNull();
    if (!appButton) return;
    await userEvent.click(appButton);
    const boardButton = screen.getByTestId('expand-button-Board');
    expect(boardButton).not.toBeNull();
    if (!boardButton) return;
    await userEvent.click(boardButton);
    const rowButtons = screen.getAllByTestId('expand-button-Row');
    expect(rowButtons.length).toBe(3);
    let rowsClicked = 0;
    for (const rowButton of rowButtons) {
      await userEvent.click(rowButton);
      const boxButtons = screen.getAllByTestId('component-leaf-Box');
      rowsClicked++;
      expect(boxButtons.length).toBe(3 * rowsClicked);
    }
  });
});
