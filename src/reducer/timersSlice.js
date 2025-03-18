import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadTimers = createAsyncThunk("timers/loadTimers", async () => {
  return await window.electronAPI.getTimers();
});

export const timersSlice = createSlice({
  name: "timers",
  initialState: [],

  reducers: {
    addTimer: (state, action) => {
      const newTimers = state.map((timer) => ({
        ...timer,
        isSelected: false,
      }));

      const updatedTimers = [
        ...newTimers,
        { ...action.payload, isSelected: true },
      ];

      console.log(`addTimer:`, updatedTimers);

      window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedTimers)));
      return updatedTimers;
    },

    // addTimer: (state, action) => {
    //   const { isMain, mainTimerId } = action.payload;

    //   const updatedTimers = state.map((timer) => {
    //     if (isMain) {
    //       return { ...timer, isSelected: false };
    //     }

    //     return timer.id === mainTimerId
    //       ? { ...timer, isSelected: true }
    //       : timer;
    //   });

    //   updatedTimers.push({
    //     ...action.payload,
    //     isSelected: isMain ? true : false,
    //   });

    //   window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedTimers)));
    //   return updatedTimers;
    // },

    updateTimer: (state, action) => {
      const updatedState = state.map((timer) =>
        timer.id === action.payload.id
          ? { ...timer, ...action.payload, isSelected: true }
          : { ...timer, isSelected: false }
      );

      console.log(`updateTimer:`, updatedState);

      window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedState)));
      return updatedState;
    },

    deleteTimer: (state, action) => {
      const updatedTimers = state.filter(
        (timer) => timer.id !== action.payload
      );
      window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedTimers)));
      console.log(updatedTimers);
      return updatedTimers;
    },

    clearTimers: () => {
      window.electronAPI.saveTimers([]);
      return [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadTimers.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      return [];
    });
  },
});

export const { addTimer, updateTimer, deleteTimer, clearTimers } =
  timersSlice.actions;
export default timersSlice.reducer;
