import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: number[] = [];

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addNewEvent(state, action) {
      const payload = action.payload;
      state.push(payload.event);
    },
  },
});

export function selectEvents(state: RootState) {
  return state.events;
}

export const { addNewEvent } = eventSlice.actions;
export default eventSlice.reducer;
