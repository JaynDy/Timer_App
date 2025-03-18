import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  initialTime: "00 : 00 : 00",
  remainingTime: "00 : 00 : 00",
  isSelected: false,
  isMain: false,
  mainTimerId: null,
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

    saveAdditionalTimer: (state, action) => {
      const { mainTimerId, additionalTimerId } = action.payload;

      // state.timers = state.timers.map((timer) => {
      //   if (timer.id === mainTimerId) {
      //     return { ...timer, isSelected: true };
      //   }
      //   if (timer.id === additionalTimerId) {
      //     return { ...timer, isSelected: false };
      //   }
      //   return timer;
      // });

      state.currentTimer = {
        ...state.currentTimer,
        isSelected: state.currentTimer.id === mainTimerId,
      };
    },

    clearCurrentTimerExceptMainId: (state, action) => {
      const { mainTimerId } = state.currentTimer;
      state.currentTimer = { ...initialState, mainTimerId };
    },
  },
});

export const {
  setCurrentTimer,
  clearCurrentTimer,
  clearCurrentTimerExceptMainId,
  saveAdditionalTimer,
} = timerSlice.actions;
export default timerSlice.reducer;
