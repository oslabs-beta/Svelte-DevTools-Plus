import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type TimedEventsType = 'sendMessage' | 'receiveMessage';

export type TimedEventsState = {
  newTimeStart: number;
  eventTimes: number[];
};

interface TimedEventPayload {
  type: TimedEventsType;
  data: number;
}
const initialState: TimedEventsState = {
  newTimeStart: -1,
  eventTimes: [],
};

const timedEventSlice = createSlice({
  name: 'timedEvents',
  initialState,
  reducers: {
    addNewEvent(state, action) {
      const payload: TimedEventPayload = action.payload;
      if (payload.type === 'sendMessage' && state.newTimeStart == -1) {
        state.newTimeStart = payload.data;
      } else if (payload.type === 'receiveMessage') {
        if (state.newTimeStart == -1) {
          return;
        }
        state.eventTimes.push(payload.data - state.newTimeStart);
        state.newTimeStart = -1;
      }
    },
  },
});

export function selectEvents(state: RootState) {
  return state.timedEvents;
}

export const { addNewEvent } = timedEventSlice.actions;
export default timedEventSlice.reducer;
