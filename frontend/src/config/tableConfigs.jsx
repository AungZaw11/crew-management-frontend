// src/config/tableConfigs.jsx

export const TABLE_CONFIGS = {
  Appointment: {
    title: "Appointment",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "division", label: "Deployment Division" },
      { key: "content", label: "Deployment Content" },
      { key: "ship", label: "Ship's Name" },
      { key: "rank", label: "Rank" },
      { key: "boardingDate", label: "Boarding Date" },
      { key: "leavingDate", label: "Leaving Date" },
      { key: "boardingPeriod", label: "Boarding Period" },
      { key: "place", label: "Place" },
      { key: "remarks", label: "Remarks" },
    ],
    rows: [],
  },

  Qualification: {
    title: "Qualification",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "expiration", label: "Expiration" },
      { key: "certificate", label: "Certificate Name" },
      { key: "trainingDate", label: "Training Date" },
      { key: "expireDate", label: "Expire Date" },
      { key: "license", label: "License Number" },
      { key: "remarks", label: "Remarks" },
    ],
    rows: [],
  },

  Replacement: {
    title: "Replacement",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "division", label: "Deployment Division" },
      { key: "content", label: "Deployment Content" },
      { key: "ship", label: "Ship's Name" },
      { key: "rank", label: "Rank" },
      { key: "date", label: "Date" },
      { key: "place", label: "Place" },
      { key: "remarks", label: "Remarks" },
      { key: "send", label: "Send", color: "#002F67" },
    ],
    rows: [],
  },

  Payment: {
    title: "Payment",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "bank", label: "Bank Name" },
      { key: "account", label: "Account Number" },
      { key: "holder", label: "Account Holder" },
      { key: "relation", label: "Relation" },
    ],
    rows: [],
  },

  Family: {
    title: "Family",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "name", label: "Name" },
      { key: "relation", label: "Relation" },
      { key: "birth", label: "Birth" },
      { key: "remarks", label: "Remarks" },
    ],
    rows: [],
  },

  Injury: {
    title: "Injury",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "illness", label: "Illness" },
      { key: "medical", label: "Medical Name" },
      { key: "hospital", label: "Hospital" },
      { key: "start", label: "Treatment Start Date" },
      { key: "recovery", label: "Recovery Date" },
      { key: "type", label: "Public/Private" },
      { key: "expenseWon", label: "Expense_won" },
      { key: "expenseEx", label: "Expense_ex" },
      { key: "remarks", label: "Remarks" },
    ],
    rows: [],
  },

  Health: {
    title: "Health",
    filters: ["Medical Checkup", "Date"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "date", label: "Date" },
      { key: "size", label: "Size (H/W)" },
      { key: "sight", label: "Sight(L/R)" },
      { key: "hearing", label: "Hearing(L/R)" },
      { key: "blood", label: "Blood" },
      { key: "decision", label: "Decision" },
    ],
    rows: [],
  },

  Experiences: {
    title: "Experiences",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "company", label: "Company" },
      { key: "ship", label: "Ship Name" },
      { key: "rank", label: "Rank" },
      { key: "boardingDate", label: "Boarding Date" },
      { key: "leavingDate", label: "Leaving Date" },
      { key: "area", label: "Area" },
      { key: "shipType", label: "Ship Type" },
      { key: "boardLeave", label: "Board/Leave" },
    ],
    rows: [],
  },

  Evaluation: {
    title: "Evaluation",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "evaluator", label: "Evaluator" },
      { key: "period", label: "Period" },
      { key: "overall", label: "Overall Rating" },
      { key: "technical", label: "Technical Skills" },
      { key: "teamwork", label: "Teamwork" },
      { key: "recommendation", label: "Recommendation" },
      { key: "comments", label: "Comments" },
    ],
    rows: [],
  },

  Certificates: {
    title: "Certificates",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "name", label: "Certificate Name" },
      { key: "number", label: "Certificate Number" },
      { key: "issueDate", label: "Issue Date" },
      { key: "expiryDate", label: "Expiry Date" },
      { key: "authority", label: "Issuing Authority" },
      { key: "status", label: "Status" },
    ],
    rows: [],
  },

  Accident: {
    title: "Accident",
    filters: ["All"],
    showDelete: true,
    columns: [
      { key: "id", label: "No", color: "#6B7280" },
      { key: "date", label: "Incident Date" },
      { key: "location", label: "Location" },
      { key: "type", label: "Accident Type" },
      { key: "severity", label: "Severity" },
      { key: "reportedBy", label: "Reported By" },
      { key: "description", label: "Description" },
      { key: "actionTaken", label: "Action Taken" },
    ],
    rows: [],
  },
};

// ===== HELPER: Get tab config by key =====
export const getTabConfig = (tabKey) => {
  const configMap = {
    personal_info: "Personal Info",
    qualifications: "Qualification",
    appointment: "Appointment",
    replacement: "Replacement",
    payment: "Payment",
    family: "Family",
    injury: "Injury",
    health: "Health",
    experiences: "Experiences",
    evaluation: "Evaluation",
    certificates: "Certificates",
    accident: "Accident",
  };

  const configKey = configMap[tabKey];
  return TABLE_CONFIGS[configKey] || null;
};

// ===== HELPER: Get API endpoint for tab =====
export const getApiEndpoint = (tabKey) => {
  const endpoints = {
    personal_info: "personal-info",
    qualifications: "qualifications",
    appointment: "appointments",
    replacement: "replacements",
    payment: "payments",
    family: "families",
    injury: "injuries",
    health: "health",
    experiences: "experiences",
    evaluation: "evaluations",
    certificates: "certificates",
    accident: "accidents",
  };
  return endpoints[tabKey] || tabKey;
};

// ===== STATIC ROWS FOR DEMO =====
export const DEMO_ROWS = {
  Appointment: Array.from({ length: 7 }, (_, i) => ({
    id: String(i + 1).padStart(2, "0"),
    division: "Date Limit",
    content: "Deck",
    ship: "Major Requirements",
    rank: "Passport",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "Passport",
    place: "Passport",
    remarks: "Passport",
  })),

  Qualification: [
    {
      id: "01",
      expiration: "Date Limit",
      certificate: "Deck",
      trainingDate: "2026-05-02",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
    {
      id: "02",
      expiration: "Date Limit",
      certificate: "Deck",
      trainingDate: "2025-05-07",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
    {
      id: "03",
      expiration: "Etc",
      certificate: "Deck",
      trainingDate: "2026-05-02",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
    {
      id: "04",
      expiration: "None",
      certificate: "Deck",
      trainingDate: "2026-05-02",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
    {
      id: "05",
      expiration: "Date Limit",
      certificate: "Deck",
      trainingDate: "2026-05-02",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
    {
      id: "06",
      expiration: "Date Limit",
      certificate: "Deck",
      trainingDate: "2026-05-02",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
    {
      id: "07",
      expiration: "Date Limit",
      certificate: "Deck",
      trainingDate: "2026-05-02",
      expireDate: "2028-05-02",
      license: "Major Requirements",
      remarks: "Passport",
    },
  ],

  Replacement: Array.from({ length: 7 }, (_, i) => ({
    id: String(i + 1).padStart(2, "0"),
    division: "Deployment Division",
    content: "Deployment Content",
    ship: "Ship's Name",
    rank: "Rank",
    date: "2026-05-02",
    place: "2028-05-02",
    remarks: "Passport",
    send: "Send Mail",
  })),

  Payment: [
    {
      id: "01",
      bank: "CB Bank",
      account: "xxxx xxxx xxxx xxxx",
      holder: "U Kyaw Kyaw",
      relation: "Father",
    },
  ],

  Family: [
    {
      id: "01",
      name: "Mg Mg",
      relation: "Brother",
      birth: "09-08-99",
      remarks: "-",
    },
  ],

  Injury: [
    {
      id: "01",
      illness: "-",
      medical: "Disease",
      hospital: "Asia Royal",
      start: "08-02-24",
      recovery: "12-02-24",
      type: "Private",
      expenseWon: "-",
      expenseEx: "-",
      remarks: "-",
    },
  ],

  Health: [
    {
      id: "01",
      date: "23-07-2024",
      size: "170cm / 65kg",
      sight: "1.0 / 1.0",
      hearing: "Normal / Normal",
      blood: "O",
      decision: "Normal",
    },
  ],

  Experiences: [
    {
      id: "01",
      company: "COSCO Shipping",
      ship: "MT Sea Dragon",
      rank: "Captain",
      boardingDate: "2025-05-22",
      leavingDate: "2025-05-29",
      area: "Middle East",
      shipType: "Bulk Carrier",
      boardLeave: "Board",
    },
  ],

  Evaluation: [
    {
      id: "01",
      evaluator: "John Doe",
      period: "2024-01 - 2024-12",
      overall: "4.5",
      technical: "4.8",
      teamwork: "4.2",
      recommendation: "Excellent",
      comments: "Good performance",
    },
  ],

  Certificates: [
    {
      id: "01",
      name: "STCW Certificate",
      number: "STCW-2024-001",
      issueDate: "2024-01-15",
      expiryDate: "2029-01-14",
      authority: "MMS",
      status: "Active",
    },
  ],

  Accident: [
    {
      id: "01",
      date: "2024-06-15",
      location: "Deck",
      type: "Slip and Fall",
      severity: "Moderate",
      reportedBy: "Captain",
      description: "Slip on wet deck",
      actionTaken: "First aid",
    },
  ],
};
