import type { Component, TreeHistory } from '../types';
import { treeHistory } from './store';

export function addNewSnapshot(newSnapshot: Component) {
  treeHistory.update((history: TreeHistory) => ({
    treeHistory: [...history.treeHistory, newSnapshot],
  }));
}

export function deleteAllSnapshots() {
  treeHistory.update(() => ({
    treeHistory: [],
  }));
}
