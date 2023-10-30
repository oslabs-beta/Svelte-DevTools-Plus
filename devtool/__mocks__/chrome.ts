import { Snapshot } from '../src/pages/Panel/slices/currentSnapshotSlice';
import * as mockData from '../src/pages/Panel/mock-components.json';
type ChromeMessageListener = (message: any) => void;

interface MockRuntime {
  onMessage: {
    addListener: (callback: ChromeMessageListener) => void;
    _triggerMessage: (message: any) => void;
  };
  sendMessage: (message: MockMessageType) => void;
}

interface MockTabReturn {
  id: number;
}

interface MockMessageType {
  message:
    | 'getRootComponent'
    | 'getSvelteVersion'
    | 'handleClosedPanel'
    | 'injectState'
    | 'injectSnapshot';
  snapshot?: Snapshot;
}

interface MockTabs {
  query: (queryInfo: any) => MockTabReturn[];
  sendMessage: (tabId: number, message: MockMessageType) => void;
}

interface MockChrome {
  runtime: MockRuntime;
  tabs: MockTabs;
}

const listeners: ChromeMessageListener[] = [];

const chrome: MockChrome = {
  runtime: {
    onMessage: {
      addListener: function (callback) {
        listeners.push(callback);
      },
      _triggerMessage: function (message) {
        listeners.forEach((callback) => callback(message));
      },
    },
    sendMessage: function (message) {},
  },
  tabs: {
    query: jest.fn().mockReturnValue([{ id: 0 }]),
    sendMessage: (tabId, request) => {
      switch (request.message) {
        case 'getRootComponent':
          {
            const message = {
              type: 'returnRootComponent',
              rootComponent: mockData,
            };
            listeners.forEach((f) => f(message));
          }
          break;
        case 'getSvelteVersion':
          {
          }
          break;
        case 'handleClosedPanel':
          {
          }
          break;
        case 'injectState':
          {
          }
          break;
        case 'injectSnapshot':
          {
          }
          break;
      }

      console.log('listeners', listeners);
    },
  },
};

declare global {
  var chrome: MockChrome;
}

global.chrome = chrome;

export default chrome;
