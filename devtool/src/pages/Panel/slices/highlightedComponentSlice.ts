import { createSlice } from "@reduxjs/toolkit";

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

export function selectHighlightedComponent(state: any) {
  return state.highlightedComponent;
}
export const { setHighlightedComponent } = highlightedComponentSlice.actions;
export default highlightedComponentSlice.reducer;
