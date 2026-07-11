// src/features/experience/services/experienceService.js
import api from "../../../services/api";

export const experienceService = {
  // Get all experiences
  getAll: () => api.get("/experiences"),

  // Get experience by ID
  getById: (id) => api.get(`/experiences/${id}`),

  // Create experience
  create: (data) => api.post("/experiences", data),

  // Update experience
  update: (id, data) => api.put(`/experiences/${id}`, data),

  // Delete experience
  delete: (id) => api.delete(`/experiences/${id}`),
};

export default experienceService;