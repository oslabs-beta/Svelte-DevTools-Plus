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
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-syntax-highlighter)/)', // Ignore all node_modules except react-syntax-highlighter
  ],
  setupFilesAfterEnv: ['./jest.setup.js', '<rootDir>/src/setupTests.ts'],
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default config;
