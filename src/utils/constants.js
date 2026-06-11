// src/utils/constants.js
export const ROLES = {
    ADMIN: 'ADMIN',
    CREW_MANAGER: 'CREW_MANAGER',
    CAPTAIN: 'CAPTAIN',
    CREW: 'CREW',
};

export const CERTIFICATE_STATUS = {
    VALID: 'VALID',
    WARNING: 'WARNING',
    CRITICAL: 'CRITICAL',
    EXPIRED: 'EXPIRED',
};

export const APPOINTMENT_STATUS = {
    SIGN_ON: 'SIGN_ON',
    SIGN_OFF: 'SIGN_OFF',
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    CREWS: '/crews',
    CERTIFICATES: '/certificates',
    DASHBOARD: '/dashboard',
};

export const PAGINATION = {
    DEFAULT_PAGE: 0,
    DEFAULT_SIZE: 20,
    PAGE_SIZES: [10, 20, 50, 100],
};