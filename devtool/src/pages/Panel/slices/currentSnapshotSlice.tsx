import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState = {
  rootComponent: null,
};

// Keeps track of which snapshot the user is on
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
