// src/services/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "language": localStorage.getItem("language") || "en",
  },
  timeout: 10000,
});

// ==================== Request Interceptor ====================
api.interceptors.request.use(
  (config) => {
    // ✅ Add token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Add language header (always use latest)
    const language = localStorage.getItem("language") || "en";
    config.headers.language = language;

    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Response Interceptor ====================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expire_date");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;