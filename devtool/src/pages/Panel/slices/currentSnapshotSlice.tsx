import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Component } from './highlightedComponentSlice';

export interface Snapshot {
  rootComponent: Component | null;
  timeTaken: string;
}

const initialState = {
  rootComponent: null,
  timeTaken: new Date().toDateString(),
} as Snapshot;

const currentSnapshotSlice = createSlice({
  name: 'currentSnapshot',
  initialState,
  reducers: {
    setCurrentSnapshot(state, action) {
      const payload = action.payload;
      state.rootComponent = payload.rootComponent;
    },
  },
});

export function selectCurrentSnapshot(state: RootState) {
  return state.currentSnapshot;
}
export const { setCurrentSnapshot } = currentSnapshotSlice.actions;
export default currentSnapshotSlice.reducer;
