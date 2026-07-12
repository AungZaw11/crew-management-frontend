// src/features/payment/services/paymentService.js
import api from "../../../services/api";

// ===== MOCK DATA =====
const MOCK_PAYMENTS = [
  {
    id: 1,
    no: "01",
    bankName: "CB Bank",
    accountNumber: "xxxx xxxx xxxx 1234",
    accountHolder: "U Kyaw Kyaw",
    relation: "Father",
    amount: 1500000,
    paymentDate: "2026-05-02",
    remarks: "Monthly salary",
    status: "Paid",
  },
  {
    id: 2,
    no: "02",
    bankName: "KBZ Bank",
    accountNumber: "xxxx xxxx xxxx 5678",
    accountHolder: "Daw Mya Mya",
    relation: "Mother",
    amount: 1200000,
    paymentDate: "2026-05-01",
    remarks: "Monthly salary",
    status: "Paid",
  },
  {
    id: 3,
    no: "03",
    bankName: "AYA Bank",
    accountNumber: "xxxx xxxx xxxx 9012",
    accountHolder: "U Maung Maung",
    relation: "Spouse",
    amount: 2000000,
    paymentDate: "2026-04-30",
    remarks: "Bonus payment",
    status: "Pending",
  },
];

export const paymentService = {
  getByCrewId: async (crewId) => {
    console.log("🔹 getByCrewId called with crewId:", crewId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: MOCK_PAYMENTS };
  },

  getById: async (id) => {
    console.log("🔹 getById called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const payment = MOCK_PAYMENTS.find(item => item.id === parsedId);
    if (!payment) {
      throw new Error("Payment not found");
    }
    return { data: payment };
  },

  create: async (data) => {
    console.log("🔹 create called with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newPayment = {
      id: MOCK_PAYMENTS.length + 1,
      no: String(MOCK_PAYMENTS.length + 1).padStart(2, '0'),
      ...data,
      status: "Pending",
    };
    MOCK_PAYMENTS.push(newPayment);
    return { data: newPayment };
  },

  update: async (id, data) => {
    console.log("🔹 update called with id:", id, "data:", data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_PAYMENTS.findIndex(item => item.id === parsedId);
    if (index === -1) {
      throw new Error("Payment not found");
    }
    MOCK_PAYMENTS[index] = { ...MOCK_PAYMENTS[index], ...data };
    return { data: MOCK_PAYMENTS[index] };
  },

  delete: async (id) => {
    console.log("🔹 delete called with id:", id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const parsedId = typeof id === 'string' ? parseInt(id) : id;
    const index = MOCK_PAYMENTS.findIndex(item => item.id === parsedId);
    if (index === -1) {
      throw new Error("Payment not found");
    }
    MOCK_PAYMENTS.splice(index, 1);
    return { data: { success: true } };
  },
};

export default paymentService;