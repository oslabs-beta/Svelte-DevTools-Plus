/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react';
import Panel from './Panel';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import chrome from '../../../__mocks__/chrome';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

jest.mock('chrome');

describe('Panel tests', function () {
  beforeEach(() => {
    // I get a "chrome is not defined" error for some reason without this ???
    chrome;
  });

  afterEach(cleanup);

  // afterAll(cleanup);
  const panel = (
    <Provider store={store}>
      <BrowserRouter>
        <Panel />
      </BrowserRouter>
    </Provider>
  );
  it('Successfully loads component data', async () => {
    await act(async () => render(panel));
    const app = screen.getByText('App');
    expect(app).toBeInTheDocument();
    expect(app).toMatchSnapshot();
  });

  it('Matches the snapshot', async () => {
    await act(async () => render(panel));
    const element = screen.getByTestId('panel');
    expect(element).toMatchSnapshot();

  });
});
