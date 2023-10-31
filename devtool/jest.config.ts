import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^chrome$': '<rootDir>/__mocks__/chrome.ts',
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js', '<rootDir>/src/setupTests.ts'],
  testEnvironment: 'node',

  // transformIgnorePatterns: ['/node_modules/(?!(foo|bar)/)', '/bar/'],
};

export default config;
