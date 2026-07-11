// src/features/evaluation/services/evaluationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import evaluationService from "./evaluationService";

// ===== ASYNC THUNKS =====
export const fetchEvaluations = createAsyncThunk(
  "evaluation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await evaluationService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch evaluations");
    }
  }
);

export const fetchEvaluationById = createAsyncThunk(
  "evaluation/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await evaluationService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch evaluation");
    }
  }
);

export const createEvaluation = createAsyncThunk(
  "evaluation/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await evaluationService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create evaluation");
    }
  }
);

export const updateEvaluation = createAsyncThunk(
  "evaluation/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await evaluationService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update evaluation");
    }
  }
);

export const deleteEvaluation = createAsyncThunk(
  "evaluation/delete",
  async (id, { rejectWithValue }) => {
    try {
      await evaluationService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete evaluation");
    }
  }
);

// ===== SLICE =====
const initialState = {
  evaluations: [],
  selectedEvaluation: null,
  isLoading: false,
  error: null,
};

const evaluationSlice = createSlice({
  name: "evaluation",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedEvaluation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchEvaluations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvaluations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evaluations = action.payload;
      })
      .addCase(fetchEvaluations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchEvaluationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvaluationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedEvaluation = action.payload;
      })
      .addCase(fetchEvaluationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createEvaluation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvaluation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evaluations.push(action.payload);
      })
      .addCase(createEvaluation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateEvaluation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEvaluation.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.evaluations.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.evaluations[index] = action.payload;
        }
        state.selectedEvaluation = action.payload;
      })
      .addCase(updateEvaluation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteEvaluation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvaluation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evaluations = state.evaluations.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteEvaluation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = evaluationSlice.actions;
export default evaluationSlice.reducer;