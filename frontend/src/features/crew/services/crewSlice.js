// src/features/crew/services/crewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import crewService from "./crewService";

// ===== ASYNC THUNKS =====
export const fetchCrews = createAsyncThunk(
  "crew/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await crewService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch crews");
    }
  }
);

export const fetchCrewById = createAsyncThunk(
  "crew/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await crewService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch crew");
    }
  }
);

export const createCrew = createAsyncThunk(
  "crew/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await crewService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create crew");
    }
  }
);

export const updateCrew = createAsyncThunk(
  "crew/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await crewService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update crew");
    }
  }
);

export const deleteCrew = createAsyncThunk(
  "crew/delete",
  async (id, { rejectWithValue }) => {
    try {
      await crewService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete crew");
    }
  }
);

// ===== INITIAL STATE =====
const initialState = {
  crews: [],
  selectedCrew: null,
  isLoading: false,
  error: null,
};

// ===== SLICE =====
const crewSlice = createSlice({
  name: "crew",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedCrew = null;
    },
    setSelectedCrew: (state, action) => {
      state.selectedCrew = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchCrews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCrews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.crews = action.payload;
      })
      .addCase(fetchCrews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchCrewById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCrewById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCrew = action.payload;
      })
      .addCase(fetchCrewById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createCrew.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCrew.fulfilled, (state, action) => {
        state.isLoading = false;
        state.crews.push(action.payload);
      })
      .addCase(createCrew.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateCrew.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCrew.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.crews.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.crews[index] = action.payload;
        }
        state.selectedCrew = action.payload;
      })
      .addCase(updateCrew.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteCrew.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCrew.fulfilled, (state, action) => {
        state.isLoading = false;
        state.crews = state.crews.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCrew.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected, setSelectedCrew } = crewSlice.actions;
export default crewSlice.reducer;