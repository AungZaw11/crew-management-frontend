// src/features/health/services/healthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import healthService from "./healthService";

// ===== ASYNC THUNKS =====
export const fetchHealths = createAsyncThunk(
  "health/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await healthService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch health records");
    }
  }
);

export const fetchHealthById = createAsyncThunk(
  "health/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await healthService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch health record");
    }
  }
);

export const createHealth = createAsyncThunk(
  "health/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await healthService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create health record");
    }
  }
);

export const updateHealth = createAsyncThunk(
  "health/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await healthService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update health record");
    }
  }
);

export const deleteHealth = createAsyncThunk(
  "health/delete",
  async (id, { rejectWithValue }) => {
    try {
      await healthService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete health record");
    }
  }
);

// ===== SLICE =====
const initialState = {
  healths: [],
  selectedHealth: null,
  isLoading: false,
  error: null,
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedHealth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchHealths.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHealths.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healths = action.payload;
      })
      .addCase(fetchHealths.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchHealthById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHealthById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedHealth = action.payload;
      })
      .addCase(fetchHealthById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createHealth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healths.push(action.payload);
      })
      .addCase(createHealth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateHealth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.healths.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.healths[index] = action.payload;
        }
        state.selectedHealth = action.payload;
      })
      .addCase(updateHealth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteHealth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteHealth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healths = state.healths.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteHealth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = healthSlice.actions;
export default healthSlice.reducer;