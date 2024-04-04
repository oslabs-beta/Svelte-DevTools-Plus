import { Component } from './pages/Panel/slices/highlightedComponentSlice';

export type MessageType =
  | 'getRootComponent'
  | 'getSvelteVersion'
  | 'handleClosedPanel'
  | 'injectState'
  | 'injectSnapshot';

export interface ChromeMessage {
  message: MessageType;
  snapshot?: Component;
  componentId?: number;
  newState?: {
    [stateKey: string]: number | string;
  };
}

export default function sendMessage(message: MessageType, payload: any) {
  console.time();
  chrome.tabs.sendMessage(payload.tab.id!, {
    message,
    componentId: payload.componentId,
    newState: payload.newState,
  });
}
