// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en", // ← Default Language
  },
  timeout: 10000,
});

// ===== REQUEST INTERCEPTOR =====
api.interceptors.request.use(
  (config) => {
    // ===== TOKEN =====
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ===== LANGUAGE HEADER =====
    const language = localStorage.getItem("language") || "en";
    config.headers["Accept-Language"] = language; // ← kr or en

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== RESPONSE INTERCEPTOR =====
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;