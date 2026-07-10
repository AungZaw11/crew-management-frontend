// src/services/api.js
import axios from "axios";

// ===== USE PROXY FOR DEVELOPMENT =====
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // ← timeout တိုးပါ
});

// ==================== Request Interceptor ====================
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
  (error) => Promise.reject(error),
);

// ==================== Response Interceptor ====================
api.interceptors.response.use(
  (response) => {
    console.log(`🔹 Response: ${response.status} ${response.config.url}`);
    console.log(`🔹 Response Data:`, response.data);
    return response;
  },
  (error) => {
    console.error(`🔹 Response Error:`, error);
    
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
  },
);

export default api;