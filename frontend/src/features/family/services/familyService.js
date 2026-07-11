// src/features/family/services/familyService.js
import api from "../../../services/api";

export const familyService = {
  // Get all families
  getAll: () => api.get("/families"),

  // Get family by ID
  getById: (id) => api.get(`/families/${id}`),

  // Create family
  create: (data) => api.post("/families", data),

  // Update family
  update: (id, data) => api.put(`/families/${id}`, data),

  // Delete family
  delete: (id) => api.delete(`/families/${id}`),
};

export default familyService;