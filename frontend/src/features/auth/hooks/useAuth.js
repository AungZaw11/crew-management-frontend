// src/features/auth/hooks/useAuth.js
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/authService";
import { setUser, logout, setLoading, setError } from "../services/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoadingState] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { user, isAuthenticated, error } = useSelector((state) => state.auth);

  // ===== CHECK AUTH (useCallback နဲ့ Wrap လုပ်ပါ) =====
  const checkAuth = useCallback(() => {
    try {
      const token = authService.getToken();
      const userData = authService.getUser();

      if (token && userData && Object.keys(userData).length > 0) {
        dispatch(setUser({ ...userData, token }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Auth check error:", error);
      dispatch(logout());
    } finally {
      setInitialized(true);
    }
  }, [dispatch]); 

  // ===== AUTO CHECK AUTH ON MOUNT =====
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ===== LOGIN =====
  const login = async (credentials) => {
    setLoadingState(true);
    dispatch(setLoading(true));

    try {
      const response = await authService.login(credentials);

      if (response.status === true) {
        const { token, ...userData } = response.data;
        authService.saveToken(token, userData);
        dispatch(setUser({ ...userData, token }));
        toast.success(response.message || "Login successful!");
        setInitialized(true);
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || "Login failed");
        dispatch(setError(response.message));
        return { success: false, error: response.message };
      }
    } catch (error) {
      const message = error.message || "Login failed";
      toast.error(message);
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  // ===== LOGOUT =====
  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    setInitialized(false);
    navigate("/login");
    toast.info("Logged out successfully");
  };

  // ===== GET ROLE =====
  const getRole = () => {
    const role = user?.role || "";
    return role.replace("ROLE_", "").toUpperCase();
  };

  // ===== IS ADMIN =====
  const isAdmin = () => {
    const role = getRole();
    return role === "ADMIN" || role === "SUPER_ADMIN";
  };

  return {
    user,
    isAuthenticated,
    loading,
    initialized,
    error,
    login,
    logout: handleLogout,
    checkAuth,
    getRole,
    isAdmin,
  };
};