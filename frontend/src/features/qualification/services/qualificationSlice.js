// src/features/qualification/services/qualificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qualificationService from "./qualificationService";

// ===== ASYNC THUNKS =====
export const fetchQualificationsByCrewId = createAsyncThunk(
  "qualification/fetchByCrewId",
  async (crewId, { rejectWithValue }) => {
    try {
      console.log("🔹 fetchQualificationsByCrewId - crewId:", crewId);
      const response = await qualificationService.getByCrewId(crewId);
      return response.data;
    } catch (error) {
      console.error("🔹 Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQualificationById = createAsyncThunk(
  "qualification/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      console.log("🔹 fetchQualificationById - id:", id);
      const response = await qualificationService.getById(id);
      return response.data;
    } catch (error) {
      console.error("🔹 Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const createQualification = createAsyncThunk(
  "qualification/create",
  async (data, { rejectWithValue }) => {
    try {
      console.log("🔹 createQualification - data:", data);
      const response = await qualificationService.create(data);
      return response.data;
    } catch (error) {
      console.error("🔹 Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateQualification = createAsyncThunk(
  "qualification/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("🔹 updateQualification - id:", id, "data:", data);
      const response = await qualificationService.update(id, data);
      return response.data;
    } catch (error) {
      console.error("🔹 Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQualification = createAsyncThunk(
  "qualification/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log("🔹 deleteQualification - id:", id);
      await qualificationService.delete(id);
      return id;
    } catch (error) {
      console.error("🔹 Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ===== SLICE =====
const initialState = {
  qualifications: [],
  selectedQualification: null,
  isLoading: false,
  error: null,
};

const qualificationSlice = createSlice({
  name: "qualification",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedQualification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch By Crew ID
      .addCase(fetchQualificationsByCrewId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQualificationsByCrewId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.qualifications = action.payload;
      })
      .addCase(fetchQualificationsByCrewId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchQualificationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQualificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedQualification = action.payload;
      })
      .addCase(fetchQualificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createQualification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createQualification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.qualifications.push(action.payload);
      })
      .addCase(createQualification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateQualification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQualification.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.qualifications.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.qualifications[index] = action.payload;
        }
        state.selectedQualification = action.payload;
      })
      .addCase(updateQualification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteQualification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteQualification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.qualifications = state.qualifications.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteQualification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = qualificationSlice.actions;
export default qualificationSlice.reducer;