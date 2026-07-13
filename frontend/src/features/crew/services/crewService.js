// src/features/crew/services/crewService.js
import api from "../../../services/api";

export const crewService = {
  // ===== GET ALL CREWS =====
  getAll: async () => {
    try {
      const response = await api.get("/crew");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch crews" };
    }
  },

  // ===== GET CREW BY ID =====
  getById: async (id) => {
    try {
      const response = await api.get(`/crew/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch crew" };
    }
  },

  // ===== CREATE CREW =====
  create: async (data) => {
    try {
      const response = await api.post("/crew", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create crew" };
    }
  },

  // ===== UPDATE CREW =====
  update: async (id, data) => {
    try {
      const response = await api.put(`/crew/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update crew" };
    }
  },

  // ===== DELETE CREW =====
  delete: async (id) => {
    try {
      const response = await api.delete(`/crew/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete crew" };
    }
  },

  // ===== GET CREW STATS =====
  getStats: async () => {
    try {
      const response = await api.get("/crew/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch crew stats" };
    }
  },

  // ===== SEARCH CREWS =====
  search: async (query) => {
    try {
      const response = await api.get(`/crew/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to search crews" };
    }
  },

  // ===== GET CREW BY VESSEL =====
  getByVessel: async (vesselId) => {
    try {
      const response = await api.get(`/crew/vessel/${vesselId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch crews by vessel" };
    }
  },
};

export default crewService;