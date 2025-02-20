import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  initialTime: "00 : 00 : 00",
  remainingTime: "00 : 00 : 00",
  isChecked: "false",
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    currentTimer: initialState,
  },

  reducers: {
    setCurrentTimer: (state, action) => {
      //   console.log("Обновление", state.currentTimer, "на", action.payload);
      state.currentTimer = { ...state.currentTimer, ...action.payload };
      console.log("Updated currentTimer state:", state.currentTimer);
    },

    clearCurrentTimer: (state) => {
      state.currentTimer = initialState;
    },
  },
});

export const { setCurrentTimer, clearCurrentTimer } = timerSlice.actions;
export default timerSlice.reducer;
