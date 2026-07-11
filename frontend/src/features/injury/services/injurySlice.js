// src/features/injury/services/injurySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import injuryService from "./injuryService";

// ===== ASYNC THUNKS =====
export const fetchInjuries = createAsyncThunk(
  "injury/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await injuryService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch injuries");
    }
  }
);

export const fetchInjuryById = createAsyncThunk(
  "injury/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await injuryService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch injury");
    }
  }
);

export const createInjury = createAsyncThunk(
  "injury/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await injuryService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create injury");
    }
  }
);

export const updateInjury = createAsyncThunk(
  "injury/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await injuryService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update injury");
    }
  }
);

export const deleteInjury = createAsyncThunk(
  "injury/delete",
  async (id, { rejectWithValue }) => {
    try {
      await injuryService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete injury");
    }
  }
);

// ===== SLICE =====
const initialState = {
  injuries: [],
  selectedInjury: null,
  isLoading: false,
  error: null,
};

const injurySlice = createSlice({
  name: "injury",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedInjury = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchInjuries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInjuries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.injuries = action.payload;
      })
      .addCase(fetchInjuries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchInjuryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInjuryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedInjury = action.payload;
      })
      .addCase(fetchInjuryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createInjury.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createInjury.fulfilled, (state, action) => {
        state.isLoading = false;
        state.injuries.push(action.payload);
      })
      .addCase(createInjury.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateInjury.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInjury.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.injuries.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.injuries[index] = action.payload;
        }
        state.selectedInjury = action.payload;
      })
      .addCase(updateInjury.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteInjury.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteInjury.fulfilled, (state, action) => {
        state.isLoading = false;
        state.injuries = state.injuries.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteInjury.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = injurySlice.actions;
export default injurySlice.reducer;