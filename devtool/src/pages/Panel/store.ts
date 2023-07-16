import { configureStore } from "@reduxjs/toolkit";
import highlightedComponentReducer from "./slices/highlightedComponentSlice";

export default configureStore({
  reducer: {
    highlightedComponent: highlightedComponentReducer,
  },
});
