import '@testing-library/jest-dom';
import mockChrome, { MockChrome } from '../__mocks__/chrome';

declare global {
  var chrome: MockChrome;
}
global.chrome = mockChrome;
