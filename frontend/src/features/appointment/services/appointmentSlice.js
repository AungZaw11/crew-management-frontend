// src/features/appointment/services/appointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

// ===== ASYNC THUNKS =====
export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointment/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch appointment");
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await appointmentService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create appointment");
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await appointmentService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update appointment");
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await appointmentService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete appointment");
    }
  }
);

// ===== SLICE =====
const initialState = {
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedAppointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchAppointmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAppointment = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.appointments.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.selectedAppointment = action.payload;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = state.appointments.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelected } = appointmentSlice.actions;
export default appointmentSlice.reducer;