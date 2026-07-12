// src/features/family/services/familyService.js
import api from "../../../services/api";

const MOCK_FAMILIES = [
  {
    id: 1,
    no: "01",
    name: "Mg Mg",
    relation: "Brother",
    birth: "1999-08-09",
    phone: "+95 999 888 777",
    address: "Yangon, Myanmar",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    name: "Daw Mya Mya",
    relation: "Mother",
    birth: "1970-05-15",
    phone: "+95 999 888 778",
    address: "Mandalay, Myanmar",
    remarks: "Living with family",
  },
  {
    id: 3,
    no: "03",
    name: "U Maung Maung",
    relation: "Father",
    birth: "1968-10-20",
    phone: "+95 999 888 779",
    address: "Yangon, Myanmar",
    remarks: "-",
  },
];

export const familyService = {
  getByCrewId: async (crewId) => {
    console.log("🔹 getByCrewId called with crewId:", crewId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_FAMILIES };
  },

  getById: async (id) => {
    console.log("🔹 getById called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const family = MOCK_FAMILIES.find(item => item.id === parsedId);
    if (!family) {
      throw new Error("Family member not found");
    }
    return { data: family };
  },

  create: async (data) => {
    console.log("🔹 create called with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newFamily = {
      id: MOCK_FAMILIES.length + 1,
      no: String(MOCK_FAMILIES.length + 1).padStart(2, '0'),
      ...data,
    };
    MOCK_FAMILIES.push(newFamily);
    return { data: newFamily };
  },

  update: async (id, data) => {
    console.log("🔹 update called with id:", id, "data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_FAMILIES.findIndex(item => item.id === parsedId);
    if (index === -1) {
      throw new Error("Family member not found");
    }
    MOCK_FAMILIES[index] = { ...MOCK_FAMILIES[index], ...data };
    return { data: MOCK_FAMILIES[index] };
  },

  delete: async (id) => {
    console.log("🔹 delete called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_FAMILIES.findIndex(item => item.id === parsedId);
    if (index === -1) {
      throw new Error("Family member not found");
    }
    MOCK_FAMILIES.splice(index, 1);
    return { data: { success: true } };
  },
};

export default familyService;