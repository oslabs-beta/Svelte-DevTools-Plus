import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Component } from './highlightedComponentSlice';
import { Snapshot } from './currentSnapshotSlice';

export interface TreeHistory {
  treeHistory: Array<Snapshot>;
}

const initialState = { treeHistory: [] } as TreeHistory;

// Keeps track of all state snapshots
const treeHistorySlice = createSlice({
  name: 'treeHistory',
  initialState,
  reducers: {
    addNewSnapshot(state, action) {
      const newSnapshot: Snapshot = action.payload.newSnapshot;
      state.treeHistory.push(newSnapshot);
    },
    deleteAllSnapshots(state, action) {
      state.treeHistory = [...state.treeHistory].slice(-1);
    },
  },
});

export function selectTreeHistory(state: RootState) {
  return state.treeHistory;
}
export const { addNewSnapshot } = treeHistorySlice.actions;
export default treeHistorySlice.reducer;
