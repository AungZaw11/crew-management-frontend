// src/services/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ==================== Request Interceptor ====================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //  Language Header (EN or KR)
    const language = localStorage.getItem("language") || "en";
    config.headers.language = language;
    console.log(` Request Language: ${language}`);

    return config;
  },
  (error) => Promise.reject(error),
);

// ==================== Response Interceptor ====================
api.interceptors.response.use(
  (response) => {
    console.log(` Response from: ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
