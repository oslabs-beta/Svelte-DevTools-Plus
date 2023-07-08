import { configureStore } from "@reduxjs/toolkit";
import selectedComponentReducer from "./slices/selectedComponentSlice";

export default configureStore({
  reducer: {
    selectedComponent: selectedComponentReducer,
  },
});