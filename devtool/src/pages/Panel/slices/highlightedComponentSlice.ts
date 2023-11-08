import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Component {
  tagName: string;
  // A components detail can have any kind of data inside of it
  detail: any;
  children: Array<Component>;
  id: number;
  uniqueId: string;
}

const initialState = {
  tagName: '',
  detail: [],
  children: [],
  id: -1,
  uniqueId: '',
} as Component;

// Keeps track of the information of the selected component
const highlightedComponentSlice = createSlice({
  name: 'highlightedComponent',
  initialState,
  reducers: {
    setHighlightedComponent(state, action) {
      const payload = action.payload;
      state.detail = payload.detail;
      state.tagName = payload.tagName;
      state.id = payload.id;
      state.uniqueId = payload.uniqueId;
    },
    updateHighlightedComponent(state, action) {
      const payload = action.payload;
      state.detail = payload.detail;
      state.tagName = payload.tagName;
    },
  },
});

export function selectHighlightedComponent(state: RootState) {
  return state.highlightedComponent;
}
export const { setHighlightedComponent, updateHighlightedComponent } =
  highlightedComponentSlice.actions;
export default highlightedComponentSlice.reducer;
