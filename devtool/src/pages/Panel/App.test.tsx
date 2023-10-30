/**
 * @jest-environment jsdom
 */
// import { describe, expect, test } from '@jest/globals';
import { render, screen, cleanup } from '@testing-library/react';
import Panel from './Panel';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import chrome from '../../../__mocks__/chrome';
import '@testing-library/jest-dom'

jest.mock('chrome');

describe('test tests', function () {
  beforeEach(() => {
    console.log(chrome);
    console.log('hi');
  });

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
  });
});

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(1 + 2).toBe(3);
//   });
// });
