// src/features/crew/services/crewService.js
const mockCrews = [
  {
    id: 1,
    crew_code: "CRW001",
    name_eng: "Aung Ko Htet",
    name_kor: "아웅코텟",
    rank: "Chief Officer",
    vessel: "Sun Rio",
    status: "active",
    hire_date: "2023-01-15",
    email: "aung.ko@example.com",
    phone: "+95 999 888 777",
  },
  {
    id: 2,
    crew_code: "CRW002",
    name_eng: "Mg Mg Lwin",
    name_kor: "엠지엠",
    rank: "Engineer",
    vessel: "Woori Sun",
    status: "on_leave",
    hire_date: "2023-03-20",
    email: "mg.mg@example.com",
    phone: "+95 999 888 778",
  },
];

export const crewService = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: mockCrews };
  },
  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const crew = mockCrews.find((c) => c.id === parseInt(id));
    if (!crew) throw new Error("Crew not found");
    return { data: crew };
  },
  create: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCrew = {
      id: mockCrews.length + 1,
      ...data,
      status: "active",
    };
    mockCrews.push(newCrew);
    return { data: newCrew };
  },
  update: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockCrews.findIndex((c) => c.id === parseInt(id));
    if (index === -1) throw new Error("Crew not found");
    mockCrews[index] = { ...mockCrews[index], ...data };
    return { data: mockCrews[index] };
  },
  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockCrews.findIndex((c) => c.id === parseInt(id));
    if (index === -1) throw new Error("Crew not found");
    mockCrews.splice(index, 1);
    return { data: { success: true } };
  },
};

export default crewService;