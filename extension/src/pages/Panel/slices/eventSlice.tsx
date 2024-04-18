import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type EventType = 'sendMessage' | 'receiveMessage';

export type EventState = {
  newTimeStart: number;
  events: number[]
};


interface EventPayload {
  type: EventType;
  data: number;
}
const initialState: EventState = {
  newTimeStart: -1,
  events: []
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addNewEvent(state, action) {
      const payload: EventPayload = action.payload;
      if (payload.type === 'sendMessage' && state.newTimeStart == -1) {
        state.newTimeStart = payload.data;
      }
      else if (payload.type === 'receiveMessage') {
        if (state.newTimeStart == -1) {
          return;
        }
        state.events.push(payload.data - state.newTimeStart);
        state.newTimeStart = -1;
      }
    },
  },
});

export function selectEvents(state: RootState) {
  return state.events.events;
}

export const { addNewEvent } = eventSlice.actions;
export default eventSlice.reducer;
