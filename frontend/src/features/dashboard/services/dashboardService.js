// src/features/dashboard/services/dashboardService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const mockDashboardData = {
  totalCrews: 72,
  signOn: 45,
  signOff: 20,
  onLeave: 7,
  activeContracts: 38,
  expiringContracts: 12,
  pendingPayments: 8,
  totalAmount: 125000,
  completedContracts: 156,
  completionRate: "78%",
  availableCrew: 15,
  expiringCerts: 24,
  expiredData: [
    { id: 1, name: "Aung Ko Htet", certificate: "STCW", expiryDate: "2024-01-15" },
    { id: 2, name: "Mg Mg Lwin", certificate: "Medical", expiryDate: "2024-02-01" },
    { id: 3, name: "Htoo Htoo", certificate: "Passport", expiryDate: "2024-02-10" },
  ],
  expireSoonData: [
    { id: 1, name: "Ye Phyo Win", certificate: "GMDSS", expiryDate: "2024-04-15", daysLeft: 15 },
    { id: 2, name: "Kyaw Zin", certificate: "STCW", expiryDate: "2024-04-20", daysLeft: 20 },
    { id: 3, name: "Nay Lin", certificate: "Medical", expiryDate: "2024-04-25", daysLeft: 25 },
  ],
};

export const dashboardService = {
  // Get dashboard stats
  getStats: async () => {
    // ===== MOCK API =====
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { data: mockDashboardData };
    
    // ===== REAL API =====
    // try {
    //   const response = await api.get("/dashboard/stats");
    //   return response.data;
    // } catch (error) {
    //   throw error.response?.data || { message: "Failed to fetch dashboard stats" };
    // }
  },

  // Get recent activities
  getActivities: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: [
        { message: "New crew member added: Aung Ko Htet", time: "2 hours ago" },
        { message: "Certificate updated for Mg Mg Lwin", time: "4 hours ago" },
        { message: "Contract expired for Htoo Htoo", time: "1 day ago" },
      ],
    };
  },

  // Get upcoming tasks
  getTasks: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: [
        { title: "Review crew certifications", dueDate: "2026-07-15", priority: "High" },
        { title: "Update crew contracts", dueDate: "2026-07-20", priority: "Medium" },
        { title: "Monthly payroll processing", dueDate: "2026-07-25", priority: "High" },
      ],
    };
  },
};

export default dashboardService;