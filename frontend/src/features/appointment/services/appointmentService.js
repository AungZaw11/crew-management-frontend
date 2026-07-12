// src/features/appointment/services/appointmentService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    no: "01",
    division: "Sign On",
    content: "Re-Joining",
    ship: "Sun Rio",
    rank: "2nd Engineer",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "124 days",
    place: "-",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    division: "Sign On",
    content: "Probation",
    ship: "Sun Rio",
    rank: "Pilot",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "180 days",
    place: "-",
    remarks: "-",
  },
  {
    id: 3,
    no: "03",
    division: "Sign Off",
    content: "Vacation",
    ship: "Woori Sun",
    rank: "Engineer",
    boardingDate: "2025-05-07",
    leavingDate: "2028-05-02",
    boardingPeriod: "36 days",
    place: "Singapore",
    remarks: "Completed",
  },
  {
    id: 4,
    no: "04",
    division: "Sign On",
    content: "New Joining",
    ship: "HS Glory",
    rank: "Chief Officer",
    boardingDate: "2026-06-01",
    leavingDate: "2028-06-01",
    boardingPeriod: "180 days",
    place: "Yangon",
    remarks: "Active",
  },
  {
    id: 5,
    no: "05",
    division: "Sign Off",
    content: "Transfer",
    ship: "Oriental Star",
    rank: "Able Seaman",
    boardingDate: "2025-03-10",
    leavingDate: "2026-03-10",
    boardingPeriod: "365 days",
    place: "Busan",
    remarks: "Completed",
  },
];

export const appointmentService = {
  // ===== GET ALL APPOINTMENTS =====
  getAll: async () => {
    console.log("🔹 getAll appointments called");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_APPOINTMENTS };
  },

  // ===== GET APPOINTMENTS BY CREW ID =====
  getByCrewId: async (crewId) => {
    console.log("🔹 getByCrewId called with crewId:", crewId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Filter appointments by crewId (in real API, this would be done by the backend)
    return { data: MOCK_APPOINTMENTS };
  },

  // ===== GET APPOINTMENT BY ID =====
  getById: async (id) => {
    console.log("🔹 getById called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const appointment = MOCK_APPOINTMENTS.find(item => item.id === parsedId);
    
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    
    return { data: appointment };
  },

  // ===== CREATE APPOINTMENT =====
  create: async (data) => {
    console.log("🔹 create called with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const newAppointment = {
      id: MOCK_APPOINTMENTS.length + 1,
      no: String(MOCK_APPOINTMENTS.length + 1).padStart(2, '0'),
      ...data,
    };
    MOCK_APPOINTMENTS.push(newAppointment);
    return { data: newAppointment };
  },

  // ===== UPDATE APPOINTMENT =====
  update: async (id, data) => {
    console.log("🔹 update called with id:", id, "data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_APPOINTMENTS.findIndex(item => item.id === parsedId);
    
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    
    MOCK_APPOINTMENTS[index] = { ...MOCK_APPOINTMENTS[index], ...data };
    return { data: MOCK_APPOINTMENTS[index] };
  },

  // ===== DELETE APPOINTMENT =====
  delete: async (id) => {
    console.log("🔹 delete called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_APPOINTMENTS.findIndex(item => item.id === parsedId);
    
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    
    MOCK_APPOINTMENTS.splice(index, 1);
    return { data: { success: true } };
  },
};

export default appointmentService;