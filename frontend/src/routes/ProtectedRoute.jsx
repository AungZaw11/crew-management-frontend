// src/routes/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import LoadingSpinner from "../common/components/LoadingSpinner";

export default function ProtectedRoute() {
  const { isAuthenticated, loading, initialized, checkAuth } = useAuth();

  useEffect(() => {
   
    if (!initialized) {
      checkAuth();
    }
  }, [initialized]); 

  if (!initialized || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}