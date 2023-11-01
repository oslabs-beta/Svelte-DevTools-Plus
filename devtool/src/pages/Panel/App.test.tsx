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

  it('Expands and collapses the child components', async () => {
    // Expand everything
    const appButton = screen.getByTestId('expand-button-App');
    expect(appButton).not.toBeNull();
    await userEvent.click(appButton);
    // App's children are now expanded
    let boardButton: HTMLElement | null = screen.getByTestId(
      'expand-button-Board'
    );
    expect(boardButton).not.toBeNull();
    await userEvent.click(boardButton);
    // Board's children are now expanded
    let rowButtons = screen.getAllByTestId('expand-button-Row');
    expect(rowButtons.length).toBe(3);
    for (let row = 0; row < rowButtons.length; row++) {
      const rowButton = rowButtons[row];
      await userEvent.click(rowButton);
      const boxButtons = screen.getAllByTestId('component-leaf-Box');
      expect(boxButtons.length).toBe(3 * (row + 1));
    }
    // All Row children are now expanded
    // Collapse everything
    for (let row = 0; row < rowButtons.length; row++) {
      const rowButton = rowButtons[row];
      await userEvent.click(rowButton);
      const boxButtons = screen.queryAllByTestId('component-leaf-Box');
      expect(boxButtons.length).toBe(3 * (rowButtons.length - row - 1));
    }
    // All Row children are now collapsed
    await userEvent.click(boardButton);
    // Board's children are now collapsed
    rowButtons = screen.queryAllByTestId('expand-button-Row');
    expect(rowButtons.length).toBe(0);
    await userEvent.click(appButton);
    // App's children are now collapsed
    boardButton = screen.queryByTestId('expand-button-Board');
    expect(boardButton).toBeNull();
  });
});
