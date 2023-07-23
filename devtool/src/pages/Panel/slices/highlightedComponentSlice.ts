import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Component {
  tagName: string;
  // componentState and detail are objects that can have any kind
  // of data inside of it. Does that make it okay to use 'any' here?
  componentState: any;
  detail: any;
  children: Array<Component> | null;
  id: number;
}

const initialState = { 
  tagName: '',
  componentState: {},
  detail: [],
  children: null,
  id: -1 } as Component;


const highlightedComponentSlice = createSlice({
  name: 'highlightedComponent',
  initialState,
  reducers: {
    setHighlightedComponent(state, action) {
      const payload = action.payload;
      state.componentState = payload.componentState;
      state.detail = payload.detail;
      state.tagName = payload.tagName;
      state.id = payload.id;
    },
  },
});

export function selectHighlightedComponent(state: RootState) {
  return state.highlightedComponent;
}
export const { setHighlightedComponent } = highlightedComponentSlice.actions;
export default highlightedComponentSlice.reducer;
