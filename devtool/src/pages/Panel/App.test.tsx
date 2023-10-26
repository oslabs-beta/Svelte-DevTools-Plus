/**
 * @jest-environment jsdom
 */

// import { describe, expect, test } from '@jest/globals';
import { render, screen, cleanup } from '@testing-library/react';
import Panel from './Panel';
import { jest } from '@jest/globals';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

it('testing works', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Panel />
      </BrowserRouter>
    </Provider>
  );
  const element = screen.getByTestId('test-1');
  console.log(element);

  // expect(element).toBeInTheDocument();
});

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});
