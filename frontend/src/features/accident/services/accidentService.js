// src/features/accident/services/accidentService.js
import api from "../../../services/api";

export const accidentService = {
  // Get all accidents
  getAll: () => api.get("/accidents"),

  // Get accident by ID
  getById: (id) => api.get(`/accidents/${id}`),

  // Create accident
  create: (data) => api.post("/accidents", data),

  // Update accident
  update: (id, data) => api.put(`/accidents/${id}`, data),

  // Delete accident
  delete: (id) => api.delete(`/accidents/${id}`),
};

export default accidentService;