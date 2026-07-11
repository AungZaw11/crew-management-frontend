// src/features/dashboard/hooks/useDashboard.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { fetchDashboardData, clearError } from "../services/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  
  // ===== SELECTORS =====
  const {
    stats,
    totalCrews,
    signOn,
    signOff,
    expiredData,
    expireSoonData,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  // ===== ACTIONS =====
  const loadDashboard = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // ===== COMPUTED VALUES =====
  const hasData = !loading && !error;
  const isEmpty = hasData && totalCrews === 0;

  return {
    // Data
    stats,
    totalCrews,
    signOn,
    signOff,
    expiredData,
    expireSoonData,
    
    // Status
    loading,
    error,
    hasData,
    isEmpty,
    
    // Actions
    loadDashboard,
    resetError,
  };
};