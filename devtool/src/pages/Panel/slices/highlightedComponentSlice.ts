import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { KeyValuePair } from "../../types";


export interface Component {
  tagName: string;
  // componentState and componentProps are objects that can have any kind
  // of data inside of it. Does that make it okay to use 'any' here?
  componentState: any;
  componentProps: any;
  children: Array<Component> | null;
}

const highlightedComponentSlice = createSlice({
  name: "highlightedComponent",
  initialState: {
    tagName: "",
    componentState: {},
    componentProps: {},
    children: null,
  },
  reducers: {
    setHighlightedComponent(state, action) {
      const payload = action.payload;
      state.componentState = payload.componentState;
      state.componentProps = payload.componentProps;
      state.tagName = payload.tagName;
    },
  },
});

export function selectHighlightedComponent(state: RootState) {
  return state.highlightedComponent;
}
export const { setHighlightedComponent } = highlightedComponentSlice.actions;
export default highlightedComponentSlice.reducer;
