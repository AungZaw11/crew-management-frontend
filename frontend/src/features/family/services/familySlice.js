// src/features/family/services/familySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import familyService from "./familyService";

// ===== ASYNC THUNKS =====
export const fetchFamilies = createAsyncThunk(
  "family/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await familyService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch families");
    }
  }
);

export const fetchFamilyById = createAsyncThunk(
  "family/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await familyService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch family");
    }
  }
);

export const createFamily = createAsyncThunk(
  "family/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await familyService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create family");
    }
  }
);

export const updateFamily = createAsyncThunk(
  "family/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await familyService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update family");
    }
  }
);

export const deleteFamily = createAsyncThunk(
  "family/delete",
  async (id, { rejectWithValue }) => {
    try {
      await familyService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete family");
    }
  }
);

// ===== SLICE =====
const initialState = {
  families: [],
  selectedFamily: null,
  isLoading: false,
  error: null,
};

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedFamily = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchFamilies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.families = action.payload;
      })
      .addCase(fetchFamilies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchFamilyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFamilyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedFamily = action.payload;
      })
      .addCase(fetchFamilyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createFamily.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFamily.fulfilled, (state, action) => {
        state.isLoading = false;
        state.families.push(action.payload);
      })
      .addCase(createFamily.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateFamily.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFamily.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.families.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.families[index] = action.payload;
        }
        state.selectedFamily = action.payload;
      })
      .addCase(updateFamily.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteFamily.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFamily.fulfilled, (state, action) => {
        state.isLoading = false;
        state.families = state.families.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteFamily.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = familySlice.actions;
export default familySlice.reducer;