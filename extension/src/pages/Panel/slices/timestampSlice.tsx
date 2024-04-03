import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface TimestampState {
  timestamps: number[];
}
const initialState: TimestampState = {
  timestamps: [],
};

const timestampSlice = createSlice({
  name: 'timestamps',
  initialState,
  reducers: {
    addNewTimestamp(state, action) {
      const payload = action.payload;
      state.timestamps.push(payload.timestamp);
    },
  },
});

export function selectTimestamps(state: RootState) {
  return state.timestamps;
}

export const { addNewTimestamp } = timestampSlice.actions;
export default timestampSlice.reducer;
