import { createSlice } from "@reduxjs/toolkit";

const selectedComponentSlice = createSlice({
  name: "selectedComponent",
  initialState: {
    component: "",
    state: "",
    props: "",
  },
  reducers: {
    setSelectedComponent(state, action) {
      const payload = action.payload;
      console.log('before state', JSON.parse(JSON.stringify(state)))
      state.state = payload.state;
      state.props = payload.props;
      state.component = payload.component;
      console.log('after state', JSON.parse(JSON.stringify(state)))
    },
    // eraseUserData(state, action) {
    //   state.userEmail = "";
    //   state.name = "";
    //   state.homeAddress = "";
    //   state.rewardsPoints = "";
    // },
  },
});

export function selectSelectedComponent (state : any) {
  console.log('state', state)
  return state.selectedComponent
};
export const { setSelectedComponent } = selectedComponentSlice.actions;
export default selectedComponentSlice.reducer;