// src/features/experience/services/experienceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import experienceService from "./experienceService";

// ===== ASYNC THUNKS =====
export const fetchExperiences = createAsyncThunk(
  "experience/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await experienceService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch experiences");
    }
  }
);

export const fetchExperienceById = createAsyncThunk(
  "experience/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await experienceService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch experience");
    }
  }
);

export const createExperience = createAsyncThunk(
  "experience/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await experienceService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create experience");
    }
  }
);

export const updateExperience = createAsyncThunk(
  "experience/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await experienceService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update experience");
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "experience/delete",
  async (id, { rejectWithValue }) => {
    try {
      await experienceService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete experience");
    }
  }
);

// ===== SLICE =====
const initialState = {
  experiences: [],
  selectedExperience: null,
  isLoading: false,
  error: null,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedExperience = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchExperiences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchExperienceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedExperience = action.payload;
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences.push(action.payload);
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.experiences.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
        state.selectedExperience = action.payload;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = state.experiences.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = experienceSlice.actions;
export default experienceSlice.reducer;