// src/redux/slices/crewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ===== FETCH CREWS WITH FILTERS =====
export const fetchCrews = createAsyncThunk(
  "crew/fetchAll",
  async ({ page = 0, size = 20, search = "", rank = "", vesselId = "", isActive = null } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("size", size);
      if (search) params.append("search", search);
      if (rank) params.append("rank", rank);
      if (vesselId) params.append("vesselId", vesselId);
      if (isActive !== null) params.append("isActive", isActive);

      const response = await api.get(`/crews?${params.toString()}`);
      console.log("Crews Response:", response.data);
      
      if (response.data?.status === true) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data?.message || "Failed to fetch crews");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ===== FETCH CREW BY ID =====
export const fetchCrewById = createAsyncThunk(
  "crew/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/crews/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ===== CREATE CREW =====
export const createCrew = createAsyncThunk(
  "crew/create",
  async (crewData, { rejectWithValue }) => {
    try {
      const response = await api.post("/crews", crewData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ===== UPDATE CREW =====
export const updateCrew = createAsyncThunk(
  "crew/update",
  async ({ id, crewData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/crews/${id}`, crewData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ===== DELETE CREW =====
export const deleteCrew = createAsyncThunk(
  "crew/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/crews/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ===== INITIAL STATE =====
const initialState = {
  crews: [],
  currentCrew: null,
  loading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 20,
  filters: {
    search: "",
    rank: "",
    vesselId: "",
    isActive: null,
  },
};

// ===== SLICE =====
const crewSlice = createSlice({
  name: "crew",
  initialState,
  reducers: {
    clearCrews: (state) => {
      state.crews = [];
      state.totalItems = 0;
      state.totalPages = 0;
    },
    clearCurrentCrew: (state) => {
      state.currentCrew = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        rank: "",
        vesselId: "",
        isActive: null,
      };
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== FETCH CREWS =====
      .addCase(fetchCrews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrews.fulfilled, (state, action) => {
        state.loading = false;
        state.crews = action.payload?.content || action.payload || [];
        state.totalItems = action.payload?.totalElements || action.payload?.length || 0;
        state.totalPages = action.payload?.totalPages || 0;
        state.currentPage = action.payload?.pageable?.pageNumber || 0;
      })
      .addCase(fetchCrews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch crews";
      })
      
      // ===== FETCH CREW BY ID =====
      .addCase(fetchCrewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCrew = action.payload || null;
      })
      .addCase(fetchCrewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch crew";
      })
      
      // ===== CREATE CREW =====
      .addCase(createCrew.fulfilled, (state, action) => {
        state.crews.unshift(action.payload);
        state.totalItems += 1;
      })
      
      // ===== UPDATE CREW =====
      .addCase(updateCrew.fulfilled, (state, action) => {
        const index = state.crews.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.crews[index] = action.payload;
        }
        state.currentCrew = action.payload;
      })
      
      // ===== DELETE CREW =====
      .addCase(deleteCrew.fulfilled, (state, action) => {
        state.crews = state.crews.filter((c) => c.id !== action.payload);
        state.totalItems -= 1;
      });
  },
});

export const { 
  clearCrews, 
  clearCurrentCrew, 
  clearError, 
  setFilters, 
  resetFilters,
  setPage,
  setPageSize,
} = crewSlice.actions;

export default crewSlice.reducer;