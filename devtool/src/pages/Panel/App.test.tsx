/**
 * @jest-environment jsdom
 */
// import { describe, expect, test } from '@jest/globals';
//@ts-nocheck
import { render, screen, cleanup } from '@testing-library/react';
import Panel from './Panel';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import chrome from '../../../__mocks__/chrome';

jest.mock('chrome');

describe('test tests', function () {
  beforeEach(() => {
    // console.log(global)
    // jest.spyOn(global.chrome, 'tabs.query').mockReturnValue(0.123456789);
    console.log(chrome);
    console.log('hi');
    // global.chrome = chrome;
  });

  it('testing works', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Panel />
        </BrowserRouter>
      </Provider>
    );
    // const element = screen.getByTestId('test-1');
    // console.log(element);
    console.log('yo');
    // expect(element).toBeInTheDocument();
  });
});

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(1 + 2).toBe(3);
//   });
// });
