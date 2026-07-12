// src/features/family/services/familySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import familyService from "./familyService";

export const fetchFamilies = createAsyncThunk(
  "family/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await familyService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch families");
    }
  }
);

export const fetchFamiliesByCrewId = createAsyncThunk(
  "family/fetchByCrewId",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await familyService.getByCrewId(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch families");
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
      return rejectWithValue(error.message || "Failed to fetch family");
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
      return rejectWithValue(error.message || "Failed to create family");
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
      return rejectWithValue(error.message || "Failed to update family");
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
      return rejectWithValue(error.message || "Failed to delete family");
    }
  }
);

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
      .addCase(fetchFamiliesByCrewId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFamiliesByCrewId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.families = action.payload;
      })
      .addCase(fetchFamiliesByCrewId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
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
      .addCase(createFamily.fulfilled, (state, action) => {
        state.families.push(action.payload);
      })
      .addCase(updateFamily.fulfilled, (state, action) => {
        const index = state.families.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.families[index] = action.payload;
        }
        state.selectedFamily = action.payload;
      })
      .addCase(deleteFamily.fulfilled, (state, action) => {
        state.families = state.families.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearError, clearSelected } = familySlice.actions;
export default familySlice.reducer;