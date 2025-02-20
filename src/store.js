import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "./reducer/timerSlice";

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
  },
});
