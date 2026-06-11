// src/utils/dateHelpers.js
export const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
};

export const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
};

export const calculateDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const getExpiryStatus = (daysRemaining) => {
    if (daysRemaining === null) return { text: 'NONE', color: 'bg-gray-500' };
    if (daysRemaining < 0) return { text: 'EXPIRED', color: 'bg-red-500' };
    if (daysRemaining <= 7) return { text: 'CRITICAL', color: 'bg-orange-500' };
    if (daysRemaining <= 30) return { text: 'WARNING', color: 'bg-yellow-500' };
    return { text: 'VALID', color: 'bg-green-500' };
};