// src/features/replacement/services/replacementSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import replacementService from "./replacementService";

// ===== ASYNC THUNKS =====
export const fetchReplacements = createAsyncThunk(
  "replacement/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await replacementService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch replacements");
    }
  }
);

export const fetchReplacementsByCrewId = createAsyncThunk(
  "replacement/fetchByCrewId",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await replacementService.getByCrewId(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch replacements");
    }
  }
);

export const fetchReplacementById = createAsyncThunk(
  "replacement/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await replacementService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch replacement");
    }
  }
);

export const createReplacement = createAsyncThunk(
  "replacement/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await replacementService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create replacement");
    }
  }
);

export const updateReplacement = createAsyncThunk(
  "replacement/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await replacementService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update replacement");
    }
  }
);

export const deleteReplacement = createAsyncThunk(
  "replacement/delete",
  async (id, { rejectWithValue }) => {
    try {
      await replacementService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete replacement");
    }
  }
);

// ===== SLICE =====
const initialState = {
  replacements: [],
  selectedReplacement: null,
  isLoading: false,
  error: null,
};

const replacementSlice = createSlice({
  name: "replacement",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedReplacement = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchReplacements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReplacements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.replacements = action.payload;
      })
      .addCase(fetchReplacements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By Crew ID
      .addCase(fetchReplacementsByCrewId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReplacementsByCrewId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.replacements = action.payload;
      })
      .addCase(fetchReplacementsByCrewId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchReplacementById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReplacementById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedReplacement = action.payload;
      })
      .addCase(fetchReplacementById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createReplacement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReplacement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.replacements.push(action.payload);
      })
      .addCase(createReplacement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateReplacement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReplacement.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.replacements.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.replacements[index] = action.payload;
        }
        state.selectedReplacement = action.payload;
      })
      .addCase(updateReplacement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteReplacement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReplacement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.replacements = state.replacements.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteReplacement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = replacementSlice.actions;
export default replacementSlice.reducer;