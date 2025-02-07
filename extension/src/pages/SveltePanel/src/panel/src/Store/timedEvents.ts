import { timedEvents } from './store';
import type { TimedEventPayload } from '../types';

export function addNewEvent(payload: TimedEventPayload) {
  timedEvents.update((state) => {
    if (payload.type === 'sendMessage' && state.newTimeStart === -1) {
      return { ...state, newTimeStart: payload.data };
    } else if (payload.type === 'receiveMessage') {
      if (state.newTimeStart !== -1) {
        const newEventTime = payload.data - state.newTimeStart;
        return {
          ...state,
          eventTimes: [...state.eventTimes, newEventTime],
          newTimeStart: -1,
        };
      }
    }
    return state;
  });
}
