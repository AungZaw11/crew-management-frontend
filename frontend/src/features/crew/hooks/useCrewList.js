// src/features/crew/hooks/useCrewList.js
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrews, deleteCrew } from "../services/crewSlice";
import toastHelper from "../../../utils/toastHelper";

export const useCrewList = () => {
  const dispatch = useDispatch();
  const { crews, isLoading, error } = useSelector((state) => state.crew);

  useEffect(() => {
    dispatch(fetchCrews());
  }, [dispatch]);

  const refreshCrews = useCallback(() => {
    dispatch(fetchCrews());
  }, [dispatch]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this crew member?")) {
      try {
        await dispatch(deleteCrew(id)).unwrap();
        toastHelper.success("Crew member deleted successfully!");
        refreshCrews();
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete crew member");
      }
    }
  }, [dispatch, refreshCrews]);

  return {
    crews,
    isLoading,
    error,
    deleteCrew: handleDelete,
    refreshCrews,
  };
};