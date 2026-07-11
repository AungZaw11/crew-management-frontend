// src/features/auth/services/authService.js
import api from "../../../services/api";

const USE_MOCK = true;

const mockLogin = (credentials) => {
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
};

export const authService = {
  // ===== LOGIN =====
  login: async (credentials) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockLogin(credentials);
    }

    try {
      const response = await api.post("/auth/sign", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  // ===== LOGOUT =====
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
    // LocalStorage ကိုလည်း ရှင်းပါ
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  },

 
  setToken: (token) => {
    localStorage.setItem("token", token);
  },

 
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

 
  saveToken: (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  },

  // ===== GET CURRENT USER (API) =====
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to get user" };
    }
  },
};

export default authService;