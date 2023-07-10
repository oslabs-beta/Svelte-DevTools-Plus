import { createSlice } from "@reduxjs/toolkit";

const selectedComponentSlice = createSlice({
  name: "selectedComponent",
  initialState: {
    component: "",
    componentState: "",
    componentProps: "",
  },
  reducers: {
    setSelectedComponent(state, action) {
      const payload = action.payload;
      state.componentState = payload.componentState;
      state.componentProps = payload.componentProps;
      state.component = payload.component;
    },
  },
});

export function selectSelectedComponent (state : any) {
  return state.selectedComponent
};
export const { setSelectedComponent } = selectedComponentSlice.actions;
export default selectedComponentSlice.reducer;