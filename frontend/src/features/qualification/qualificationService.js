// src/features/qualification/services/qualificationService.js
import api from "../../services/api";

export const qualificationService = {
  // Get all qualifications
  getAll: () => api.get("/qualifications"),

  // Get qualification by ID
  getById: (id) => api.get(`/qualifications/${id}`),

  // Create qualification
  create: (data) => api.post("/qualifications", data),

  // Update qualification
  update: (id, data) => api.put(`/qualifications/${id}`, data),

  // Delete qualification
  delete: (id) => api.delete(`/qualifications/${id}`),
};

export default qualificationService;