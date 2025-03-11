import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "./reducer/timerSlice";
import { timersSlice } from "./reducer/timersSlice";

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
    timers: timersSlice.reducer,
  },
});
