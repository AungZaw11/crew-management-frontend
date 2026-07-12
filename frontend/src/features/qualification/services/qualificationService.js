// src/features/qualification/services/qualificationService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const MOCK_QUALIFICATIONS = [
  {
    id: 1,
    no: "01",
    expiration: "Date Limit",
    certificateName: "Deck",
    trainingDate: "2026-05-02",
    expireDate: "2028-05-02",
    licenseNumber: "COC-2024-001",
    remarks: "Valid",
    status: "Active",
  },
  {
    id: 2,
    no: "02",
    expiration: "Date Limit",
    certificateName: "Engine",
    trainingDate: "2025-05-07",
    expireDate: "2028-05-02",
    licenseNumber: "ENG-2024-002",
    remarks: "Valid",
    status: "Active",
  },
  {
    id: 3,
    no: "03",
    expiration: "Etc",
    certificateName: "GMDSS",
    trainingDate: "2026-05-02",
    expireDate: "2028-05-02",
    licenseNumber: "GMDSS-2024-003",
    remarks: "Radio",
    status: "Active",
  },
];

export const qualificationService = {
  // ===== GET ALL QUALIFICATIONS BY CREW ID =====
  getByCrewId: async (crewId) => {
    console.log("🔹 getByCrewId called with crewId:", crewId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_QUALIFICATIONS };
  },

  // ===== GET QUALIFICATION BY ID =====
  getById: async (id) => {
    console.log("🔹 getById called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const qualification = MOCK_QUALIFICATIONS.find(item => item.id === parsedId);
    
    console.log("🔹 Found qualification:", qualification);
    
    if (!qualification) {
      throw new Error("Qualification not found");
    }
    
    return { data: qualification };
  },

  // ===== CREATE QUALIFICATION =====
  create: async (data) => {
    console.log("🔹 create called with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const newQualification = {
      id: MOCK_QUALIFICATIONS.length + 1,
      no: String(MOCK_QUALIFICATIONS.length + 1).padStart(2, '0'),
      ...data,
      status: "Active",
    };
    MOCK_QUALIFICATIONS.push(newQualification);
    return { data: newQualification };
  },

  // ===== UPDATE QUALIFICATION =====
  update: async (id, data) => {
    console.log("🔹 update called with id:", id, "data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_QUALIFICATIONS.findIndex(item => item.id === parsedId);
    
    if (index === -1) {
      throw new Error("Qualification not found");
    }
    
    MOCK_QUALIFICATIONS[index] = { ...MOCK_QUALIFICATIONS[index], ...data };
    return { data: MOCK_QUALIFICATIONS[index] };
  },

  // ===== DELETE QUALIFICATION =====
  delete: async (id) => {
    console.log("🔹 delete called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_QUALIFICATIONS.findIndex(item => item.id === parsedId);
    
    if (index === -1) {
      throw new Error("Qualification not found");
    }
    
    MOCK_QUALIFICATIONS.splice(index, 1);
    return { data: { success: true } };
  },
};

export default qualificationService;