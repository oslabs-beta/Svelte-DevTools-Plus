import { Snapshot } from '../src/pages/Panel/slices/currentSnapshotSlice';
import data from './mockData';

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
  query: (queryInfo: any) => any[];
  sendMessage: (tabId: number, message: MockMessageType) => void;
}

export interface MockChrome {
  runtime: MockRuntime;
  tabs: MockTabs;
}

const listeners: ChromeMessageListener[] = [];

function updateState(id: number | undefined, newState: any): Boolean {
  function helper(component: any): Boolean {
    if (component.id === id) {
      for (let i = 0; i < component.detail.ctx.length; i++) {
        const state = component.detail.ctx[i];
        if (state.key === Object.keys(newState)[0]) {
          const value = Object.values(newState)[0];
          if (state.value === value) return false;
          state.value = value;
          return true;
        }
      }
      return false;
    }
    for (let i = 0; i < component.children.length; i++) {
      const child = component.children[i];
      return helper(child);
    }
    return false;
  }
  return helper(data);
}

const chrome: MockChrome = {
  runtime: {
    onMessage: {
      addListener: (callback) => {
        listeners.push(callback);
      },
      _triggerMessage: (message) => {
        listeners.forEach((callback) => callback(message));
      },
    },
    sendMessage: function (message) {},
  },
  tabs: {
    query: () => {
      return [{ id: 0 }];
    },
    sendMessage: (tabId, request) => {
      switch (request.message) {
        case 'getRootComponent':
          {
            const message = {
              type: 'returnRootComponent',
              rootComponent: JSON.parse(JSON.stringify(data)),
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
            const stateUpdated = updateState(
              request.componentId,
              request.newState
            );
            if (!stateUpdated) return;
            const message = {
              type: 'updateRootComponent',
              rootComponent: JSON.parse(JSON.stringify(data)),
            };
            listeners.forEach((f) => f(message));
          }
          break;
        case 'injectSnapshot':
          {
          }
          break;
      }
    },
  },
};

export default chrome;
