/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Panel from './Panel';
import { configureStore } from '@reduxjs/toolkit';
import highlightedComponentReducer from './slices/highlightedComponentSlice';
import currentSnapshotReducer from './slices/currentSnapshotSlice';
import treeHistoryReducer from './slices/treeHistorySlice';

jest.mock('chrome');

function setupStore() {
  return configureStore({
    reducer: {
      highlightedComponent: highlightedComponentReducer,
      currentSnapshot: currentSnapshotReducer,
      treeHistory: treeHistoryReducer,
    },
  });
}

async function customRender(ui: any, store: any) {
  await act(async () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Panel />
        </BrowserRouter>
      </Provider>
    )
  );
}

describe('Panel tests', function () {
  let store: any;
  beforeEach(async () => {
    store = setupStore();
    await customRender(<Panel />, store);
  });

  afterEach(() => {
    chrome.clearListeners();
    chrome.resetMockData();
    jest.clearAllMocks();
  });

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
    await userEvent.click(appButton);
    // App's children are now expanded
    let boardButton: HTMLElement | null = screen.getByTestId(
      'expand-button-Board'
    );
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

  it('Properly displays component info', async () => {
    // Open App component
    const appExpand = screen.getByTestId('expand-button-App');
    await userEvent.click(appExpand);
    // Click on Board component
    const boardButton = screen.getByTestId('component-button-Board');
    await userEvent.click(boardButton);
    // Check Board's turn state
    const turnStateButton = screen.getByTestId('state-value-turn');
    expect(turnStateButton.querySelector('p')?.innerHTML).toBe('X');
  });

  async function changeBoardTurnState(value: string) {
    const turnModifier = screen.getByTestId('modifier-turn');
    await userEvent.click(turnModifier);
    await userEvent.type(turnModifier, value);
    await userEvent.keyboard('{Enter}');
  }

  it('Changes turn state to "Q"', async () => {
    // Click on Board component
    const appExpand = screen.getByTestId('expand-button-App');
    await userEvent.click(appExpand);
    const boardButton = screen.getByTestId('component-button-Board');
    await userEvent.click(boardButton);
    const value = 'Q';
    await changeBoardTurnState(value);
    // Check if its state has been changed
    const turnStateButton = screen.getByTestId('state-value-turn');
    expect(turnStateButton.querySelector('p')?.innerHTML).toBe(value);
  });

  it('Rewinds and reverts state', async () => {
    // Click on Board component
    const appExpand = screen.getByTestId('expand-button-App');
    await userEvent.click(appExpand);
    const boardButton = screen.getByTestId('component-button-Board');
    await userEvent.click(boardButton);
    // Change its state to create new snapshots
    await changeBoardTurnState('1');
    await changeBoardTurnState('2');
    await changeBoardTurnState('3');
    // Check if its state has changed
    let turnStateButton = screen.getByTestId('state-value-turn');
    expect(turnStateButton.querySelector('p')?.innerHTML).toBe('3');
    let rewindButton = screen.getByTestId('rewind-button');
    await userEvent.click(rewindButton);
    // Check if rewind was successful
    turnStateButton = screen.getByTestId('state-value-turn');
    expect(turnStateButton.querySelector('p')?.innerHTML).toBe('2');
    const forwardButton = screen.getByTestId('revert-button');
    await userEvent.click(forwardButton);
    // Check if revert was successful
    turnStateButton = screen.getByTestId('state-value-turn');
    expect(turnStateButton.querySelector('p')?.innerHTML).toBe('3');
    // Clicks the mock slider, which sets the snapshot to snapshot #2
    const rewinderSlider = screen.getByTestId('rewinder-slider');
    await userEvent.click(rewinderSlider);
    turnStateButton = screen.getByTestId('state-value-turn');
    expect(turnStateButton.querySelector('p')?.innerHTML).toBe('1');
  });

  // Jest does not support svgdom so this is all the testing we can
  // do with TreePage
  it('Navigates to TreePage', async () => {
    const treeButton = screen.getByTestId('tree-link');
    await userEvent.click(treeButton);
    const treePage = screen.getByTestId('tree-page');
    expect(treePage).toBeInTheDocument();
  });
});

// Things that need to be tested:
// Rewinder: pick a snapshot
// TreePage: select a component
//
