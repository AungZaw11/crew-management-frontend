// src/features/payment/services/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

// ===== ASYNC THUNKS =====

// ✅ fetchPayments (အကုန်လုံး)
export const fetchPayments = createAsyncThunk(
  "payment/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch payments");
    }
  }
);

// ✅ fetchPaymentsByCrewId (Crew ID နဲ့)
export const fetchPaymentsByCrewId = createAsyncThunk(
  "payment/fetchByCrewId",
  async (crewId, { rejectWithValue }) => {
    try {
      const response = await paymentService.getByCrewId(crewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch payments");
    }
  }
);

export const fetchPaymentById = createAsyncThunk(
  "payment/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await paymentService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch payment");
    }
  }
);

export const createPayment = createAsyncThunk(
  "payment/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create payment");
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await paymentService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update payment");
    }
  }
);

export const deletePayment = createAsyncThunk(
  "payment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await paymentService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete payment");
    }
  }
);

// ===== SLICE =====
const initialState = {
  payments: [],
  selectedPayment: null,
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By Crew ID
      .addCase(fetchPaymentsByCrewId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByCrewId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsByCrewId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchPaymentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPayment = action.payload;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      })
      // Update
      .addCase(updatePayment.fulfilled, (state, action) => {
        const index = state.payments.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
        state.selectedPayment = action.payload;
      })
      // Delete
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearError, clearSelected } = paymentSlice.actions;
export default paymentSlice.reducer;  