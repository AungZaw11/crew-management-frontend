// src/features/personal-info/services/personalInfoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import personalInfoService from "../hooks/personalInfoService";

// ===== ASYNC THUNKS =====
export const createPersonalInfo = createAsyncThunk(
  "personalInfo/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await personalInfoService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create personal info");
    }
  }
);

export const updatePersonalInfo = createAsyncThunk(
  "personalInfo/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await personalInfoService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update personal info");
    }
  }
);

export const fetchPersonalInfoById = createAsyncThunk(
  "personalInfo/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await personalInfoService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch personal info");
    }
  }
);

export const fetchPersonalInfoByCrewId = createAsyncThunk(
  "personalInfo/fetchByCrewId",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await personalInfoService.getByCrewId(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch personal info");
    }
  }
);

// ===== SLICE =====
const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createPersonalInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPersonalInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createPersonalInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updatePersonalInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePersonalInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updatePersonalInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchPersonalInfoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPersonalInfoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By Crew ID
      .addCase(fetchPersonalInfoByCrewId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfoByCrewId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPersonalInfoByCrewId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearData } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;