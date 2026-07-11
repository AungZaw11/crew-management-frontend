// src/features/calendar/services/calendarService.js
import api from "../../../services/api";

export const calendarService = {
  getCalendarData: async (params) => {
    // ===== MOCK API =====
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data based on filters
    const mockData = [
      { date: "07", events: [
        { id: 1, name: "Aung Ko Htet", type: "disembark", rank: "Chief Officer" },
        { id: 2, name: "Mg Mg Lwin", type: "disembark", rank: "Engineer" },
      ]},
      { date: "15", events: [
        { id: 3, name: "Ye Phyo Win", type: "embark", rank: "2nd Officer" },
      ]},
      { date: "23", events: [
        { id: 4, name: "Kyaw Zin", type: "embark", rank: "Chief Engineer" },
        { id: 5, name: "Nay Lin", type: "certificate", rank: "Boatswain" },
      ]},
    ];
    
    return { data: mockData };
    
    // ===== REAL API =====
    // return api.get("/calendar", { params });
  },
};

export default calendarService;