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

// Keeps track of which snapshot the user is on
const currentSnapshotSlice = createSlice({
  name: 'currentSnapshot',
  initialState,
  reducers: {
    setCurrentSnapshot(state, action) {
      console.log('looking in the right spot')
      console.log(action.payload);
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
