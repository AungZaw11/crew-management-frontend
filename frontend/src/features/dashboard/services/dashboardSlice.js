// src/features/dashboard/services/dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

// ===== ASYNC THUNKS =====
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data");
    }
  }
);

// ===== INITIAL STATE =====
const initialState = {
  stats: null,
  totalCrews: 0,
  signOn: 0,
  signOff: 0,
  expiredData: [],
  expireSoonData: [],
  isLoading: false,
  error: null,
};

// ===== SLICE =====
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardStats: (state, action) => {
      state.stats = action.payload;
      state.totalCrews = action.payload?.totalCrews || 0;
      state.signOn = action.payload?.signOn || 0;
      state.signOff = action.payload?.signOff || 0;
      state.expiredData = action.payload?.expiredData || [];
      state.expireSoonData = action.payload?.expireSoonData || [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDashboard: (state) => {
      state.stats = null;
      state.totalCrews = 0;
      state.signOn = 0;
      state.signOff = 0;
      state.expiredData = [];
      state.expireSoonData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.totalCrews = action.payload?.totalCrews || 0;
        state.signOn = action.payload?.signOn || 0;
        state.signOff = action.payload?.signOff || 0;
        state.expiredData = action.payload?.expiredData || [];
        state.expireSoonData = action.payload?.expireSoonData || [];
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// ===== EXPORTS =====
export const {
  setDashboardStats,
  setLoading,
  setError,
  clearError,        
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;