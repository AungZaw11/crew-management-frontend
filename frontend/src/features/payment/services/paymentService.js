// src/features/payment/services/paymentService.js
import api from "../../../services/api";

export const paymentService = {
  // Get all payments
  getAll: () => api.get("/payments"),

  // Get payment by ID
  getById: (id) => api.get(`/payments/${id}`),

  // Create payment
  create: (data) => api.post("/payments", data),

  // Update payment
  update: (id, data) => api.put(`/payments/${id}`, data),

  // Delete payment
  delete: (id) => api.delete(`/payments/${id}`),
};

export default paymentService;