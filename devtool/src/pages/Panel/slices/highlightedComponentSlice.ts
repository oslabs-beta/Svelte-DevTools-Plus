import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const highlightedComponentSlice = createSlice({
  name: "highlightedComponent",
  initialState: {
    component: "",
    componentState: "",
    componentProps: "",
  },
  reducers: {
    setHighlightedComponent(state, action) {
      const payload = action.payload;
      state.componentState = payload.componentState;
      state.componentProps = payload.componentProps;
      state.component = payload.component;
    },
  },
});

export function selectHighlightedComponent(state: RootState) {
  return state.highlightedComponent;
}
export const { setHighlightedComponent } = highlightedComponentSlice.actions;
export default highlightedComponentSlice.reducer;
