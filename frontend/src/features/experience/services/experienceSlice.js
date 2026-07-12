// src/features/experience/services/experienceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import experienceService from "./experienceService";

// ===== FETCH ALL =====
export const fetchExperiences = createAsyncThunk(
  "experience/fetchExperiences",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await experienceService.getExperiences(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ FETCH BY ID - ဒီဟာကို ထည့်ပါ
export const fetchExperienceById = createAsyncThunk(
  "experience/fetchExperienceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await experienceService.getExperienceById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== CREATE =====
export const createExperience = createAsyncThunk(
  "experience/createExperience",
  async (data, { rejectWithValue }) => {
    try {
      const response = await experienceService.createExperience(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== UPDATE =====
export const updateExperience = createAsyncThunk(
  "experience/updateExperience",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await experienceService.updateExperience(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== DELETE =====
export const deleteExperience = createAsyncThunk(
  "experience/deleteExperience",
  async (id, { rejectWithValue }) => {
    try {
      await experienceService.deleteExperience(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
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
      // ===== FETCH ALL =====
      .addCase(fetchExperiences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ===== FETCH BY ID =====
      .addCase(fetchExperienceById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedExperience = action.payload;
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ===== CREATE =====
      .addCase(createExperience.fulfilled, (state, action) => {
        state.experiences.push(action.payload);
      })
      // ===== UPDATE =====
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.experiences.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
        state.selectedExperience = action.payload;
      })
      // ===== DELETE =====
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { clearError, clearSelected } = experienceSlice.actions;
export default experienceSlice.reducer;