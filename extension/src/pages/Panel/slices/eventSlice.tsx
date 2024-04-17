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
      console.log(JSON.parse(JSON.stringify(state)))
      const payload: EventPayload = action.payload;
      if (payload.type === 'sendMessage' && state.newTimeStart != -1) {
        state.newTimeStart = payload.data;
      }
      if (payload.type === 'receiveMessage') {
        state.newTimeStart = payload.data;
        if (state.newTimeStart == -1) {
          return;
        }
        console.log('should push')
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
