// src/features/personal-info/services/personalInfoService.js
import api from "../../../services/api";

export const personalInfoService = {
  // Create personal info
  create: (data) => api.post("/personal-info", data),

  // Update personal info
  update: (id, data) => api.put(`/personal-info/${id}`, data),

  // Get personal info by ID
  getById: (id) => api.get(`/personal-info/${id}`),

  // Get personal info by crew ID
  getByCrewId: (crewId) => api.get(`/personal-info/crew/${crewId}`),
};

export default personalInfoService;