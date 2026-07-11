// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// ============================================================
// MOCK DATA
// ============================================================
const USE_MOCK = true; // ← Backend မရှိရင် true ထားပါ

export const mockData = {
  login: (credentials) => {
    console.log("🔹 Mock Login:", credentials);
    return {
      status: true,
      message: "Login successful",
      data: {
        token: "mock-jwt-token-12345",
        refreshToken: "mock-refresh-token-67890",
        username: "admin",
        fullName: "Admin User",
        email: "admin@gws.com",
        role: "ROLE_ADMIN",
        expiresIn: Date.now() + 3600000,
      },
    };
  },

  getDashboardStats: () => ({
    status: true,
    message: "Success",
    data: {
      stats: {
        totalCertificates: 15,
        expiredCertificates: 0,
        expiringIn30Days: 8,
        totalContracts: 6,
        expiredContracts: 0,
        contractsExpiringIn30Days: 6,
        totalPPT: 8,
        pptExpiringIn30Days: 8,
        totalVessels: 7,
        activeVessels: 7,
        inactiveVessels: 0,
        totalCrew: 11,
        signOn: 8,
        signOff: 3,
        activeCrew: 11,
      },
      pieChart: {
        totalCrew: 11,
        signOn: 8,
        signOff: 3,
        segments: [
          { label: "Sign On", value: 8, color: "#4D55A8" },
          { label: "Sign Off", value: 3, color: "#D97F79" },
        ],
      },
      certificateExpiry: [
        {
          crewName: "Ko Htoo",
          vesselName: "CS Crystal",
          rank: "Chief Officer",
          certificateName: "CDC",
          expiryDate: "2026-07-20",
          daysRemaining: 10,
        },
        {
          crewName: "Mg Mg",
          vesselName: "HS Glory",
          rank: "Seaman",
          certificateName: "STCW Basic Safety",
          expiryDate: "2026-07-25",
          daysRemaining: 15,
        },
      ],
      recentActivities: [
        {
          activity: "New crew added: Min Khant",
          timestamp: "2026-07-09 16:46",
          user: "System",
          type: "CREW",
        },
        {
          activity: "New certificate: Deck",
          timestamp: "2026-07-09 13:29",
          user: "System",
          type: "CERTIFICATE",
        },
      ],
      upcomingEvents: [
        {
          title: "Vessel Inspection",
          date: "2026-07-15",
          type: "Inspection",
          description: "Annual inspection for HS Glory",
        },
      ],
      overdueCrews: [
        {
          crewName: "Win Aung",
          vesselName: "CS Crystal",
          rank: "First Officer",
          overdueDays: 125,
          status: "Overdue",
        },
      ],
      educationExpiry: [
        {
          crewName: "Tun Tun",
          vesselName: "N/A",
          rank: "Deck",
          educationName: "Certificate of Endorsement (GMDSS)",
          expireDate: "2026-08-09",
          remainingDays: "30 Days",
        },
      ],
    },
  }),

  getCrews: () => ({
    status: true,
    data: {
      content: [
        {
          id: 1,
          no: "01",
          name: "Win Aung",
          vessel: "CS Crystal",
          rank: "First Officer",
          seamanCode: "P006449",
          crewCode: "P006449",
          status: "active",
          remaining: -459,
        },
        {
          id: 2,
          no: "02",
          name: "Tun Tun",
          vessel: "HS Glory",
          rank: "Deck",
          seamanCode: "P006472",
          crewCode: "P006472",
          status: "active",
          remaining: -459,
        },
        {
          id: 3,
          no: "03",
          name: "Htet Aung Kyaw",
          vessel: "HS Glory",
          rank: "Engine",
          seamanCode: "P006488",
          crewCode: "P006488",
          status: "active",
          remaining: -459,
        },
        {
          id: 4,
          no: "04",
          name: "Mg Mg",
          vessel: "Sun Rio",
          rank: "Seaman",
          seamanCode: "P006501",
          crewCode: "P006501",
          status: "active",
          remaining: -459,
        },
        {
          id: 5,
          no: "05",
          name: "Min Khant",
          vessel: "CS Crystal",
          rank: "Cadet",
          seamanCode: "P006512",
          crewCode: "P006512",
          status: "active",
          remaining: -459,
        },
      ],
      totalElements: 5,
      totalPages: 1,
    },
  }),
};

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const language = localStorage.getItem("language") || "en";
    config.headers.language = language;
    console.log(`🔹 Request: ${config.method.toUpperCase()} ${config.url}`);
    console.log(`🔹 Request Language: ${language}`);
    console.log(`🔹 Request Data:`, config.data);

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR - Mock Data
// ============================================================
api.interceptors.response.use(
  (response) => {
    console.log(`🔹 Response: ${response.status} ${response.config.url}`);
    console.log(`🔹 Response Data:`, response.data);
    return response;
  },
  (error) => {
    console.error(`🔹 Response Error:`, error);

    // ===== IF USE_MOCK IS TRUE, RETURN MOCK DATA =====
    if (USE_MOCK) {
      const url = error.config?.url || "";
      console.log(`🔹 Mock API Call: ${url}`);

      let mockResponse = null;

      if (url.includes("/auth/sign") || url.includes("/auth/login")) {
        try {
          const data = error.config?.data ? JSON.parse(error.config.data) : {};
          mockResponse = mockData.login(data);
          console.log("✅ Mock Login Data returned");
        } catch (e) {
          console.error("❌ Error parsing login data:", e);
          mockResponse = mockData.login({});
        }
      } else if (url.includes("/dashboard/stats") || url.includes("/dashboard/all")) {
        mockResponse = mockData.getDashboardStats();
        console.log("✅ Mock Dashboard Data returned");
      } else if (url.includes("/crews")) {
        mockResponse = mockData.getCrews();
        console.log("✅ Mock Crew Data returned");
      }

      if (mockResponse) {
        console.log("✅ Returning Mock Response:", mockResponse);
        return Promise.resolve({
          data: mockResponse,
          status: 200,
          statusText: "OK",
          headers: {},
          config: error.config,
        });
      }
    }

    if (error.response?.status === 401) {
      console.log("🔹 Unauthorized - Redirecting to login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (error.code === "ECONNABORTED") {
      console.error("🔹 Request timeout!");
    }

    return Promise.reject(error);
  }
);

export default api;