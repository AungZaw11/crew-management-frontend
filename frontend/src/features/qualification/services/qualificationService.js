// src/features/qualification/services/qualificationService.js
import api from "../../../services/api";

export const qualificationService = {
  // Get all qualifications for a crew
  getByCrewId: (crewId) => api.get(`/qualification/crew/${crewId}`),

  // Get qualification by ID
  getById: (id) => api.get(`/qualification/${id}`),

  // Create qualification
  create: (data) => api.post("/qualification", data),

  // Update qualification
  update: (id, data) => api.put(`/qualification/${id}`, data),

  // Delete qualification
  delete: (id) => api.delete(`/qualification/${id}`),
};

export default qualificationService;