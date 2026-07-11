// src/features/injury/services/injuryService.js
import api from "../../../services/api";

export const injuryService = {
  // Get all injuries
  getAll: () => api.get("/injuries"),

  // Get injury by ID
  getById: (id) => api.get(`/injuries/${id}`),

  // Create injury
  create: (data) => api.post("/injuries", data),

  // Update injury
  update: (id, data) => api.put(`/injuries/${id}`, data),

  // Delete injury
  delete: (id) => api.delete(`/injuries/${id}`),
};

export default injuryService;