import { Component } from '../Store/slices/highlightedComponentSlice';

export type MessageType =
  | 'getRootComponent'
  | 'getSvelteVersion'
  | 'handleClosedPanel'
  | 'injectState'
  | 'injectSnapshot'
  | 'getProfilingData'
  | 'returnProfilingData';

export interface ChromeMessage {
  message: MessageType;
  snapshot?: Component;
  componentId?: number;
  eventTimes?: number[];
  newState?: {
    [stateKey: string]: number | string;
  };
}

export default function sendMessageToChrome(
  message: MessageType,
  payload: any = null
) {
  chrome.tabs.sendMessage(payload.tab.id!, {
    message,
    componentId: payload.componentId,
    newState: payload.newState,
    snapshot: payload.snapshot,
    eventTimes: payload.eventTimes,
  });
}
