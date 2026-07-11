// src/features/dashboard/services/dashboardService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const mockDashboardData = {
  // ===== Summary Cards Data =====
  certificateCount: 96,
  certificateLeft: 30,
  certificateRight: 20,
  
  contractCount: 55,
  contractLeft: 20,
  contractRight: 15,
  
  pptCount: 124,
  pptLeft: 40,
  pptRight: 25,
  
  vesselCount: 24,
  vesselLeft: 10,
  vesselRight: 8,
  
  // ===== Crew Status =====
  totalCrews: 1200,
  signOn: 800,
  signOff: 400,
  onLeave: 150,
  
  // ===== Expired Contracts Table =====
  expiredData: [
    { id: 1, name: "Mg Mg", vessel: "Sun Rio", rank: "Captain", overdue: "30 Days" },
    { id: 2, name: "Aung Aung", vessel: "Woori Sun", rank: "Pilot", overdue: "45 Days" },
    { id: 3, name: "Ko Htoo", vessel: "HS Glory", rank: "Chief Officer", overdue: "20 Days" },
    { id: 4, name: "Hla Hla", vessel: "Oriental Star", rank: "Engineer", overdue: "60 Days" },
    { id: 5, name: "Ye Htet", vessel: "Sun Rio", rank: "Able Seaman", overdue: "15 Days" },
    { id: 6, name: "Lin Lin", vessel: "Woori Sun", rank: "Captain", overdue: "35 Days" },
    { id: 7, name: "John K", vessel: "HS Glory", rank: "Pilot", overdue: "25 Days" },
  ],
  
  // ===== Expire Soon Table =====
  expireSoonData: [
    { id: 1, name: "Ye Htet", vessel: "Sun Rio", rank: "Pilot", education: "Certificate of Endorsement (GMDSS)", expireDate: "2024-04-15", remaining: "30 Days" },
    { id: 2, name: "Lin Lin", vessel: "Woori Sun", rank: "Captain", education: "Captain", expireDate: "2024-04-20", remaining: "30 Days" },
    { id: 3, name: "John K", vessel: "HS Glory", rank: "Pilot", education: "Pilot", expireDate: "2024-04-25", remaining: "30 Days" },
    { id: 4, name: "Mg Mg", vessel: "Sun Rio", rank: "Captain", education: "Captain", expireDate: "2024-04-28", remaining: "30 Days" },
    { id: 5, name: "Aung Aung", vessel: "Woori Sun", rank: "Pilot", education: "Pilot", expireDate: "2024-04-30", remaining: "30 Days" },
    { id: 6, name: "Ko Htoo", vessel: "HS Glory", rank: "Chief Officer", education: "Captain", expireDate: "2024-05-05", remaining: "30 Days" },
  ],
  
  // ===== Pie Chart Data =====
  signOn: 800,
  signOff: 400,
  totalCrews: 1200,
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

  

 
};

export default dashboardService;