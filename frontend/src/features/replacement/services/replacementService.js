// src/features/replacement/services/replacementService.js
import api from "../../../services/api";

export const replacementService = {
  // Get all replacements
  getAll: () => api.get("/replacements"),

  // Get replacement by ID
  getById: (id) => api.get(`/replacements/${id}`),

  // Create replacement
  create: (data) => api.post("/replacements", data),

  // Update replacement
  update: (id, data) => api.put(`/replacements/${id}`, data),

  // Delete replacement
  delete: (id) => api.delete(`/replacements/${id}`),
};

export default replacementService;