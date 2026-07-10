// src/redux/api/dashboard.js
import api from "../../services/api";

// ============================================================
// DASHBOARD API SERVICES
// ============================================================

export const dashboardApi = {
  // ===== GET DASHBOARD STATS =====
  getDashboardStats: async () => {
    try {
      const response = await api.get("/dashboard/stats");
      console.log("Dashboard Stats Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // ===== GET CERTIFICATE EXPIRY =====
  getCertificateExpiry: async () => {
    try {
      const response = await api.get("/dashboard/certificates/expiry");
      return response.data;
    } catch (error) {
      console.error("Error fetching certificate expiry:", error);
      throw error;
    }
  },

  // ===== GET CONTRACT EXPIRY =====
  getContractExpiry: async () => {
    try {
      const response = await api.get("/dashboard/contracts/expiry");
      return response.data;
    } catch (error) {
      console.error("Error fetching contract expiry:", error);
      throw error;
    }
  },

  // ===== GET OVERDUE CREWS =====
  getOverdueCrews: async () => {
    try {
      const response = await api.get("/dashboard/crews/overdue");
      return response.data;
    } catch (error) {
      console.error("Error fetching overdue crews:", error);
      throw error;
    }
  },

  // ===== GET RECENT ACTIVITIES =====
  getRecentActivities: async (limit = 10) => {
    try {
      const response = await api.get(`/dashboard/activities/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      throw error;
    }
  },

  // ===== GET UPCOMING EVENTS =====
  getUpcomingEvents: async () => {
    try {
      const response = await api.get("/dashboard/events/upcoming");
      return response.data;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  },

  // ===== GET EDUCATION EXPIRY =====
  getEducationExpiry: async () => {
    try {
      const response = await api.get("/dashboard/education/expiry");
      return response.data;
    } catch (error) {
      console.error("Error fetching education expiry:", error);
      throw error;
    }
  },

  // ===== GET ALL DASHBOARD DATA (Combined) =====
  getDashboardData: async () => {
    try {
      const response = await api.get("/dashboard/all");
      console.log("Dashboard Data Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },

  // ===== EXPORT DASHBOARD DATA =====
  exportDashboardData: async (format = "excel") => {
    try {
      const response = await api.get(`/dashboard/export?format=${format}`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting dashboard data:", error);
      throw error;
    }
  },
};

export default dashboardApi;