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
  url: string;
}

interface MockMessageType {
  message:
    | 'getRootComponent'
    | 'getSvelteVersion'
    | 'handleClosedPanel'
    | 'injectState'
    | 'injectSnapshot';
  snapshot?: Snapshot;
  componentId?: number;
  newState?: {
    [stateKey: string]: number | string;
  };
}

interface MockTabs {
  query: (queryInfo: any) => MockTabReturn[];
  sendMessage: (tabId: number, message: MockMessageType) => void;
}

export interface MockChrome {
  runtime: MockRuntime;
  tabs: MockTabs;
}

const listeners: ChromeMessageListener[] = [];

const chrome: MockChrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn((callback) => {
        listeners.push(callback);
      }),
      _triggerMessage: jest.fn((message) => {
        listeners.forEach((callback) => callback(message));
      }),
    },
    sendMessage: function (message) {},
  },
  tabs: {
    query: jest.fn().mockReturnValue([{ id: 0 }]),
    sendMessage: jest.fn((tabId, request) => {
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
    }),
  },
};

export default chrome;
