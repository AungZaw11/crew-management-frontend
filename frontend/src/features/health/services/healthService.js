// src/features/health/services/healthService.js
import api from "../../../services/api";

export const healthService = {
  // Get all health records
  getAll: () => api.get("/healths"),

  // Get health record by ID
  getById: (id) => api.get(`/healths/${id}`),

  // Create health record
  create: (data) => api.post("/healths", data),

  // Update health record
  update: (id, data) => api.put(`/healths/${id}`, data),

  // Delete health record
  delete: (id) => api.delete(`/healths/${id}`),
};

export default healthService;