// src/features/calendar/services/calendarSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import calendarService from "./calendarService";

export const fetchCalendarData = createAsyncThunk(
  "calendar/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await calendarService.getCalendarData(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch calendar data");
    }
  }
);

const initialState = {
  calendarData: [],
  isLoading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state) => {
      state.calendarData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCalendarData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calendarData = action.payload;
      })
      .addCase(fetchCalendarData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearData } = calendarSlice.actions;
export default calendarSlice.reducer;