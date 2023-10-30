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
import { act } from 'react-dom/test-utils';

jest.mock('chrome');

describe('test tests', function () {
  beforeEach(() => {
    // I get a "chrome is not defined" error for some reason without this ???
    chrome;
  });

  it('testing works', async () => {
    await act( async () => render(
      <Provider store={store}>
        <BrowserRouter>
          <Panel />
        </BrowserRouter>
      </Provider>
    ));
    const element = screen.getByTestId('root-component');
    console.log(element);
  });
});

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(1 + 2).toBe(3);
//   });
// });
