import chrome from 'sinon-chrome';

declare global {
  namespace NodeJS {
    interface Global {
      chrome: typeof chrome;
    }
  }
}
