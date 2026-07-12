// src/features/health/services/healthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import healthService from "./healthService";

// ===== INJURIES =====
export const fetchInjuries = createAsyncThunk(
  "health/fetchInjuries",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await healthService.getInjuries(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInjuryById = createAsyncThunk(
  "health/fetchInjuryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await healthService.getInjuryById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createInjury = createAsyncThunk(
  "health/createInjury",
  async (data, { rejectWithValue }) => {
    try {
      const response = await healthService.createInjury(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInjury = createAsyncThunk(
  "health/updateInjury",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await healthService.updateInjury(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInjury = createAsyncThunk(
  "health/deleteInjury",
  async (id, { rejectWithValue }) => {
    try {
      await healthService.deleteInjury(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== MEDICAL CHECKUPS =====
export const fetchMedicalCheckups = createAsyncThunk(
  "health/fetchMedicalCheckups",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await healthService.getMedicalCheckups(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMedicalCheckupById = createAsyncThunk(
  "health/fetchMedicalCheckupById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await healthService.getMedicalCheckupById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMedicalCheckup = createAsyncThunk(
  "health/createMedicalCheckup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await healthService.createMedicalCheckup(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMedicalCheckup = createAsyncThunk(
  "health/updateMedicalCheckup",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await healthService.updateMedicalCheckup(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMedicalCheckup = createAsyncThunk(
  "health/deleteMedicalCheckup",
  async (id, { rejectWithValue }) => {
    try {
      await healthService.deleteMedicalCheckup(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== DISEASES =====
export const fetchDiseases = createAsyncThunk(
  "health/fetchDiseases",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await healthService.getDiseases(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDiseaseById = createAsyncThunk(
  "health/fetchDiseaseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await healthService.getDiseaseById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDisease = createAsyncThunk(
  "health/createDisease",
  async (data, { rejectWithValue }) => {
    try {
      const response = await healthService.createDisease(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDisease = createAsyncThunk(
  "health/updateDisease",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await healthService.updateDisease(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDisease = createAsyncThunk(
  "health/deleteDisease",
  async (id, { rejectWithValue }) => {
    try {
      await healthService.deleteDisease(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== SLICE =====
const initialState = {
  injuries: [],
  medicalCheckups: [],
  diseases: [],
  selectedInjury: null,
  selectedMedicalCheckup: null,
  selectedDisease: null,
  isLoading: false,
  error: null,
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedInjury = null;
      state.selectedMedicalCheckup = null;
      state.selectedDisease = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== INJURIES =====
      .addCase(fetchInjuries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInjuries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.injuries = action.payload;
      })
      .addCase(fetchInjuries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchInjuryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInjuryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedInjury = action.payload;
      })
      .addCase(fetchInjuryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createInjury.fulfilled, (state, action) => {
        state.injuries.push(action.payload);
      })
      .addCase(updateInjury.fulfilled, (state, action) => {
        const index = state.injuries.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.injuries[index] = action.payload;
        state.selectedInjury = action.payload;
      })
      .addCase(deleteInjury.fulfilled, (state, action) => {
        state.injuries = state.injuries.filter((item) => item.id !== action.payload);
      })

      // ===== MEDICAL CHECKUPS =====
      .addCase(fetchMedicalCheckups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMedicalCheckups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicalCheckups = action.payload;
      })
      .addCase(fetchMedicalCheckups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMedicalCheckupById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMedicalCheckupById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMedicalCheckup = action.payload;
      })
      .addCase(fetchMedicalCheckupById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createMedicalCheckup.fulfilled, (state, action) => {
        state.medicalCheckups.push(action.payload);
      })
      .addCase(updateMedicalCheckup.fulfilled, (state, action) => {
        const index = state.medicalCheckups.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.medicalCheckups[index] = action.payload;
        state.selectedMedicalCheckup = action.payload;
      })
      .addCase(deleteMedicalCheckup.fulfilled, (state, action) => {
        state.medicalCheckups = state.medicalCheckups.filter((item) => item.id !== action.payload);
      })

      // ===== DISEASES =====
      .addCase(fetchDiseases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiseases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diseases = action.payload;
      })
      .addCase(fetchDiseases.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchDiseaseById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiseaseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDisease = action.payload;
      })
      .addCase(fetchDiseaseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createDisease.fulfilled, (state, action) => {
        state.diseases.push(action.payload);
      })
      .addCase(updateDisease.fulfilled, (state, action) => {
        const index = state.diseases.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.diseases[index] = action.payload;
        state.selectedDisease = action.payload;
      })
      .addCase(deleteDisease.fulfilled, (state, action) => {
        state.diseases = state.diseases.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearError, clearSelected } = healthSlice.actions;
export default healthSlice.reducer;