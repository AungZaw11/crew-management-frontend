// src/features/dashboard/hooks/useDashboard.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchDashboardData, clearError } from "../services/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  
  // ===== SELECTORS =====
  const {
    stats,
    totalCrews,
    signOn,
    signOff,
    overdueCrews,
    certificateExpiry,
    pieChart,
    isLoading,
    error,
  } = useSelector((state) => state.dashboard);

  // ===== ACTIONS =====
  const loadDashboard = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // ===== AUTO LOAD ON MOUNT =====
  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // ===== COMPUTED VALUES =====
  const hasData = !isLoading && !error && stats !== null;
  const isEmpty = hasData && totalCrews === 0;

  return {
    // Data
    stats,
    totalCrews,
    signOn,
    signOff,
    overdueCrews,
    certificateExpiry,
    pieChart,
    
    // Status
    isLoading,
    error,
    hasData,
    isEmpty,
    
    // Actions
    loadDashboard,
    resetError,
  };
};