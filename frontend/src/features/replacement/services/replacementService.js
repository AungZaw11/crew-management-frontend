// src/features/replacement/services/replacementService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const MOCK_REPLACEMENTS = [
  {
    id: 1,
    no: "01",
    division: "sign_on",
    content: "rejoining",
    ship: "Sun Rio",
    rank: "2nd Engineer",
    date: "2026-05-02",
    place: "Yangon",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    division: "sign_off",
    content: "vacation",
    ship: "Woori Sun",
    rank: "Engineer",
    date: "2025-05-07",
    place: "Singapore",
    remarks: "Completed",
  },
  {
    id: 3,
    no: "03",
    division: "sign_on",
    content: "probation",
    ship: "HS Glory",
    rank: "Chief Officer",
    date: "2026-06-01",
    place: "Busan",
    remarks: "Active",
  },
  {
    id: 4,
    no: "04",
    division: "sign_off",
    content: "transfer",
    ship: "Oriental Star",
    rank: "Able Seaman",
    date: "2025-03-10",
    place: "Tokyo",
    remarks: "Completed",
  },
];

export const replacementService = {
  // ===== GET ALL REPLACEMENTS =====
  getAll: async () => {
    console.log("🔹 getAll replacements called");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_REPLACEMENTS };
  },

  // ===== GET REPLACEMENTS BY CREW ID =====
  getByCrewId: async (crewId) => {
    console.log("🔹 getByCrewId called with crewId:", crewId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_REPLACEMENTS };
  },

  // ===== GET REPLACEMENT BY ID =====
  getById: async (id) => {
    console.log("🔹 getById called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const replacement = MOCK_REPLACEMENTS.find(item => item.id === parsedId);
    
    if (!replacement) {
      throw new Error("Replacement not found");
    }
    
    return { data: replacement };
  },

  // ===== CREATE REPLACEMENT =====
  create: async (data) => {
    console.log("🔹 create called with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const newReplacement = {
      id: MOCK_REPLACEMENTS.length + 1,
      no: String(MOCK_REPLACEMENTS.length + 1).padStart(2, '0'),
      ...data,
    };
    MOCK_REPLACEMENTS.push(newReplacement);
    return { data: newReplacement };
  },

  // ===== UPDATE REPLACEMENT =====
  update: async (id, data) => {
    console.log("🔹 update called with id:", id, "data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_REPLACEMENTS.findIndex(item => item.id === parsedId);
    
    if (index === -1) {
      throw new Error("Replacement not found");
    }
    
    MOCK_REPLACEMENTS[index] = { ...MOCK_REPLACEMENTS[index], ...data };
    return { data: MOCK_REPLACEMENTS[index] };
  },

  // ===== DELETE REPLACEMENT =====
  delete: async (id) => {
    console.log("🔹 delete called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_REPLACEMENTS.findIndex(item => item.id === parsedId);
    
    if (index === -1) {
      throw new Error("Replacement not found");
    }
    
    MOCK_REPLACEMENTS.splice(index, 1);
    return { data: { success: true } };
  },
};

export default replacementService;