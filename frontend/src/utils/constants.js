// src/utils/constants.js
export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  CREW_MANAGER: "CREW_MANAGER",
  CREW: "CREW",
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const APP_NAME =
  import.meta.env.VITE_APP_NAME || "Crew Management System";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";
