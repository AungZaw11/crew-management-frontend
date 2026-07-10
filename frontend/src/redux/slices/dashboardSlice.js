// src/redux/slices/dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ===== FETCH DASHBOARD DATA =====
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/stats");
      console.log("Dashboard Response:", response.data);
      
      if (response.data?.status === true) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data?.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ===== INITIAL STATE =====
const initialState = {
  stats: {
    certificate: { count: 0, expired: 0, days30: 0 },
    contract: { count: 0, expired: 0, days30: 0 },
    ppt: { count: 0, expired: 0, days30: 0 },
    vessel: { count: 0, active: 0, inactive: 0 },
  },
  totalCrews: 0,
  signOn: 0,
  signOff: 0,
  expiredData: [],
  expireSoonData: [],
  loading: false,
  error: null,
};

// ===== SLICE =====
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        
        state.stats = {
          certificate: {
            count: data?.stats?.totalCertificates || 0,
            expired: data?.stats?.expiredCertificates || 0,
            days30: data?.stats?.expiringIn30Days || 0,
          },
          contract: {
            count: data?.stats?.totalContracts || 0,
            expired: data?.stats?.contractsExpiringSoon || 0,
            days30: data?.stats?.contractsExpiringIn30Days || 0,
          },
          ppt: {
            count: data?.stats?.totalPPT || 0,
            expired: data?.stats?.pptExpiringSoon || 0,
            days30: data?.stats?.pptExpiringIn30Days || 0,
          },
          vessel: {
            count: data?.stats?.totalVessels || 0,
            active: data?.stats?.activeVessels || 0,
            inactive: data?.stats?.inactiveVessels || 0,
          },
        };
        
        state.totalCrews = data?.stats?.totalCrew || 0;
        state.signOn = data?.pieChart?.signOn || 0;
        state.signOff = data?.pieChart?.signOff || 0;
        
        state.expiredData = data?.overdueCrews?.map((item) => ({
          name: item.crewName || "Unknown",
          vessel: item.vesselName || "-",
          rank: item.rank || "-",
          overdue: `${item.overdueDays || 0} Days`,
        })) || [];
        
        state.expireSoonData = data?.certificateExpiry?.map((item) => ({
          name: item.crewName || "Unknown",
          vessel: item.vesselName || "-",
          rank: item.rank || "-",
          education: item.certificateName || "-",
          expireDate: item.expiryDate || "-",
          remaining: `${item.daysRemaining || 0} Days`,
        })) || [];
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dashboard data";
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;