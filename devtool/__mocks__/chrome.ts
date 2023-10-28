type ChromeMessageListener = (message: any) => void;

interface MockRuntime {
  onMessage: {
    addListener: (callback: ChromeMessageListener) => void;
    _triggerMessage: (message: any) => void;
  };
  sendMessage: jest.Mock;
}

interface MockTabs {
  query: (
    queryInfo: any,
    callback: (result: Array<{ id: number; title: string }>) => void
  ) => void;
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
    query: jest.fn().mockReturnValue([0]),
  },
};

//@ts-ignore
global.chrome = chrome;

export default chrome;
