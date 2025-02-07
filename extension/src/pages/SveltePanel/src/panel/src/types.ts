export interface Component {
  tagName: string;
  // A components detail can have any kind of data inside of it
  detail: any;
  children: Array<Component>;
  id: number;
}

export interface TreeHistory {
  treeHistory: Array<Component>;
}

export type TimedEventsType = 'sendMessage' | 'receiveMessage';

export type TimedEventsState = {
  newTimeStart: number;
  eventTimes: number[];
};

export interface TimedEventPayload {
  type: TimedEventsType;
  data: number;
}

export interface Snapshot {
  rootComponent: Component | null;
}
