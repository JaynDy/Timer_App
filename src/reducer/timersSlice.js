import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadTimers = createAsyncThunk("timers/loadTimers", async () => {
  return await window.electronAPI.getTimers();
});

export const timersSlice = createSlice({
  name: "timers",
  initialState: [],

  reducers: {
    addTimer: (state, action) => {
      const { id, isMain, mainTimerId } = action.payload;

      const newTimers = state.map((timer) => ({
        ...timer,
        isSelected: false,
      }));

      let updatedTimers;

      if (!mainTimerId) {
        updatedTimers = [...newTimers, { ...action.payload, isSelected: true }];
      } else {
        updatedTimers = [
          ...newTimers,
          { ...action.payload, isSelected: isMain },
        ];
      }

      updatedTimers = updatedTimers.map((timer) =>
        timer.id === mainTimerId ? { ...timer, isSelected: true } : timer
      );

      console.log(`addTimer:`, updatedTimers);

      window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedTimers)));
      return updatedTimers;
    },

    updateTimer: (state, action) => {
      const updatedTimers = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const updatedState = state.map((timer) =>
        updatedTimers.find((updatedTimer) => updatedTimer.id === timer.id)
          ? {
              ...timer,
              ...updatedTimers.find(
                (updatedTimer) => updatedTimer.id === timer.id
              ),
            }
          : timer
      );

      window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedState)));
      return updatedState;
    },

    deleteTimer: (state, action) => {
      const updatedTimers = state.filter(
        (timer) => timer.id !== action.payload
      );
      window.electronAPI.saveTimers(JSON.parse(JSON.stringify(updatedTimers)));
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
