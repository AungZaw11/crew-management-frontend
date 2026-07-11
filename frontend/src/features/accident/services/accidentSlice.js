// src/features/accident/services/accidentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accidentService from "./accidentService";

// ===== ASYNC THUNKS =====
export const fetchAccidents = createAsyncThunk(
  "accident/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accidentService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch accidents");
    }
  }
);

export const fetchAccidentById = createAsyncThunk(
  "accident/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await accidentService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch accident");
    }
  }
);

export const createAccident = createAsyncThunk(
  "accident/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await accidentService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create accident");
    }
  }
);

export const updateAccident = createAsyncThunk(
  "accident/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await accidentService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update accident");
    }
  }
);

export const deleteAccident = createAsyncThunk(
  "accident/delete",
  async (id, { rejectWithValue }) => {
    try {
      await accidentService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete accident");
    }
  }
);

// ===== SLICE =====
const initialState = {
  accidents: [],
  selectedAccident: null,
  isLoading: false,
  error: null,
};

const accidentSlice = createSlice({
  name: "accident",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedAccident = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAccidents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accidents = action.payload;
      })
      .addCase(fetchAccidents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchAccidentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccidentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAccident = action.payload;
      })
      .addCase(fetchAccidentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createAccident.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAccident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accidents.push(action.payload);
      })
      .addCase(createAccident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateAccident.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAccident.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.accidents.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.accidents[index] = action.payload;
        }
        state.selectedAccident = action.payload;
      })
      .addCase(updateAccident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteAccident.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAccident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accidents = state.accidents.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAccident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = accidentSlice.actions;
export default accidentSlice.reducer;