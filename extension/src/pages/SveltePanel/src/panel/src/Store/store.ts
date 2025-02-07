import { writable } from 'svelte/store';
import type {
  Component,
  Snapshot,
  TimedEventsState,
  TreeHistory,
} from '../types';

// Define initial states
const highlightedComponentInitial: Component = {
  tagName: '',
  detail: [],
  children: [],
  id: -1,
};

const currentSnapshotInitial = {
  rootComponent: null,
};

const treeHistoryInitial = {
  treeHistory: [],
};

const timedEventsInitial = {
  newTimeStart: -1,
  eventTimes: [],
};

// Create stores
export const highlightedComponent = writable<Component>(
  highlightedComponentInitial
);
export const currentSnapshot = writable<Snapshot>(currentSnapshotInitial);
export const treeHistory = writable<TreeHistory>(treeHistoryInitial);
export const timedEvents = writable<TimedEventsState>(timedEventsInitial);
