// src/features/health/services/healthService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const MOCK_INJURIES = [
  {
    id: 1,
    no: "01",
    illness: "-",
    medicalName: "Disease",
    hospital: "Asia Royal",
    treatmentStart: "2024-02-08",
    recoveryDate: "2024-02-12",
    type: "Private",
    expenseWon: "-",
    expenseEx: "-",
    remarks: "-",
  },
];

const MOCK_CHECKUPS = [
  {
    id: 1,
    no: "01",
    date: "2024-07-23",
    size: "170cm / 65kg",
    sight: "1.0 / 1.0",
    hearing: "Normal / Normal",
    blood: "O",
    decision: "Normal",
  },
];

const MOCK_DISEASES = [
  {
    id: 1,
    no: "01",
    startDate: "2024-07-23",
    endDate: "2024-07-25",
    illness: "Flu",
    medicine: "Paracetamol 500mg",
    otherMedicine: "Vitamin C, Cough Syrup",
    remarks: "Rest well, drink plenty of fluids",
  },
];

export const healthService = {
  // ===== INJURIES =====
  getInjuries: async (crewId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_INJURIES };
  },
  getInjuryById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_INJURIES.find(item => item.id === parseInt(id)) };
  },
  createInjury: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newItem = { id: MOCK_INJURIES.length + 1, no: String(MOCK_INJURIES.length + 1).padStart(2, '0'), ...data };
    MOCK_INJURIES.push(newItem);
    return { data: newItem };
  },
  updateInjury: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_INJURIES.findIndex(item => item.id === parseInt(id));
    if (index !== -1) MOCK_INJURIES[index] = { ...MOCK_INJURIES[index], ...data };
    return { data: MOCK_INJURIES[index] };
  },
  deleteInjury: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_INJURIES.findIndex(item => item.id === parseInt(id));
    if (index !== -1) MOCK_INJURIES.splice(index, 1);
    return { data: { success: true } };
  },

  // ===== MEDICAL CHECKUPS =====
  getMedicalCheckups: async (crewId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_CHECKUPS };
  },
  getMedicalCheckupById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_CHECKUPS.find(item => item.id === parseInt(id)) };
  },
  createMedicalCheckup: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newItem = { id: MOCK_CHECKUPS.length + 1, no: String(MOCK_CHECKUPS.length + 1).padStart(2, '0'), ...data };
    MOCK_CHECKUPS.push(newItem);
    return { data: newItem };
  },
  updateMedicalCheckup: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_CHECKUPS.findIndex(item => item.id === parseInt(id));
    if (index !== -1) MOCK_CHECKUPS[index] = { ...MOCK_CHECKUPS[index], ...data };
    return { data: MOCK_CHECKUPS[index] };
  },
  deleteMedicalCheckup: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_CHECKUPS.findIndex(item => item.id === parseInt(id));
    if (index !== -1) MOCK_CHECKUPS.splice(index, 1);
    return { data: { success: true } };
  },

  // ===== DISEASES =====
  getDiseases: async (crewId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_DISEASES };
  },
  getDiseaseById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_DISEASES.find(item => item.id === parseInt(id)) };
  },
  createDisease: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newItem = { id: MOCK_DISEASES.length + 1, no: String(MOCK_DISEASES.length + 1).padStart(2, '0'), ...data };
    MOCK_DISEASES.push(newItem);
    return { data: newItem };
  },
  updateDisease: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_DISEASES.findIndex(item => item.id === parseInt(id));
    if (index !== -1) MOCK_DISEASES[index] = { ...MOCK_DISEASES[index], ...data };
    return { data: MOCK_DISEASES[index] };
  },
  deleteDisease: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_DISEASES.findIndex(item => item.id === parseInt(id));
    if (index !== -1) MOCK_DISEASES.splice(index, 1);
    return { data: { success: true } };
  },
};

export default healthService;