// src/features/evaluation/services/evaluationService.js
import api from "../../../services/api";

export const evaluationService = {
  // Get all evaluations
  getAll: () => api.get("/evaluations"),

  // Get evaluation by ID
  getById: (id) => api.get(`/evaluations/${id}`),

  // Create evaluation
  create: (data) => api.post("/evaluations", data),

  // Update evaluation
  update: (id, data) => api.put(`/evaluations/${id}`, data),

  // Delete evaluation
  delete: (id) => api.delete(`/evaluations/${id}`),
};

export default evaluationService;