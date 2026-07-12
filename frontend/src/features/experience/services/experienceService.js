// src/features/experience/services/experienceService.js
import api from "../../../services/api";

// Mock Data
const MOCK_EXPERIENCES = [
  {
    id: 1,
    no: "01",
    company: "Sungan Shipping",
    shipName: "CS Crystal",
    rank: "Chief Officer",
    boardingDate: "2024-01-15",
    leavingDate: "2024-07-15",
    area: "Asia Pacific",
    shipType: "Container",
    board: "Sign On",
    leave: "Sign Off",
    grt: "12000",
    kw: "15000",
    remarks: "-",
    status: "Active",
  },
  {
    id: 2,
    no: "02",
    company: "Oceanic Lines",
    shipName: "MV Ocean Queen",
    rank: "Second Officer",
    boardingDate: "2023-06-10",
    leavingDate: "2023-12-20",
    area: "Europe",
    shipType: "Bulk Carrier",
    board: "Sign On",
    leave: "Sign Off",
    grt: "8500",
    kw: "10000",
    remarks: "Completed",
    status: "Completed",
  },
  {
    id: 3,
    no: "03",
    company: "Pacific Shipping",
    shipName: "MV Pacific Star",
    rank: "Third Officer",
    boardingDate: "2023-01-05",
    leavingDate: "2023-06-30",
    area: "Americas",
    shipType: "Tanker",
    board: "Sign On",
    leave: "Sign Off",
    grt: "9500",
    kw: "12000",
    remarks: "-",
    status: "Completed",
  },
];

export const experienceService = {
  // ===== GET ALL =====
  getExperiences: async (crewId) => {
    console.log("🔹 getExperiences called with crewId:", crewId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_EXPERIENCES };
  },

  // ✅ GET BY ID - ဒီဟာကို ထည့်ပါ
  getExperienceById: async (id) => {
    console.log("🔹 getExperienceById called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const experience = MOCK_EXPERIENCES.find((item) => item.id === parseInt(id));
    if (!experience) {
      throw new Error("Experience not found");
    }
    return { data: experience };
  },

  // ===== CREATE =====
  createExperience: async (data) => {
    console.log("🔹 createExperience called with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newItem = {
      id: MOCK_EXPERIENCES.length + 1,
      no: String(MOCK_EXPERIENCES.length + 1).padStart(2, "0"),
      ...data,
    };
    MOCK_EXPERIENCES.push(newItem);
    return { data: newItem };
  },

  // ===== UPDATE =====
  updateExperience: async (id, data) => {
    console.log("🔹 updateExperience called with id:", id, "data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_EXPERIENCES.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      MOCK_EXPERIENCES[index] = { ...MOCK_EXPERIENCES[index], ...data };
    }
    return { data: MOCK_EXPERIENCES[index] };
  },

  // ===== DELETE =====
  deleteExperience: async (id) => {
    console.log("🔹 deleteExperience called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_EXPERIENCES.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      MOCK_EXPERIENCES.splice(index, 1);
    }
    return { data: { success: true } };
  },
};

export default experienceService;