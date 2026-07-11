// src/features/appointment/services/appointmentService.js
import api from "../../../services/api";

export const appointmentService = {
  // Get all appointments
  getAll: () => api.get("/appointments"),

  // Get appointment by ID
  getById: (id) => api.get(`/appointments/${id}`),

  // Create appointment
  create: (data) => api.post("/appointments", data),

  // Update appointment
  update: (id, data) => api.put(`/appointments/${id}`, data),

  // Delete appointment
  delete: (id) => api.delete(`/appointments/${id}`),
};

export default appointmentService;