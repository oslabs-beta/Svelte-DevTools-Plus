import { Snapshot } from "../src/pages/Panel/slices/currentSnapshotSlice";

type ChromeMessageListener = (message: any) => void;

interface MockRuntime {
  onMessage: {
    addListener: (callback: ChromeMessageListener) => void;
    _triggerMessage: (message: any) => void;
  };
  sendMessage: jest.Mock;
}

interface MockTabReturn {
  id: number;
}

interface MockMessageType {
  message:
    | 'getRootComponent'
    | 'updateRootComponent'
    | 'returnRootComponent'
    | 'returnTempRoot'
    | 'injectSnapshot';
  snapshot?: Snapshot
}

interface MockTabs {
  query: (
    queryInfo: any
  ) => MockTabReturn[];
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
    sendMessage: jest.fn(),
  },
  tabs: {
    query: jest.fn().mockReturnValue([{ id: 0 }]),
    sendMessage: function (tabId, message) {},
  },
};

declare global {
  var chrome: MockChrome;
}

global.chrome = chrome;

export default chrome;
