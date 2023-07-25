import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Component {
  tagName: string;
  // A components detail can have any kind of data inside of it
  detail: any;
  children: Array<Component> | null;
  id: number;
}

const initialState = {
  tagName: '',
  detail: [],
  children: null,
  id: -1,
} as Component;

const highlightedComponentSlice = createSlice({
  name: 'highlightedComponent',
  initialState,
  reducers: {
    setHighlightedComponent(state, action) {
      const payload = action.payload;
      state.detail = payload.detail;
      state.tagName = payload.tagName;
      state.id = payload.id;;
    },
  },
});

export function selectHighlightedComponent(state: RootState) {
  return state.highlightedComponent;
}
export const { setHighlightedComponent } = highlightedComponentSlice.actions;
export default highlightedComponentSlice.reducer;
