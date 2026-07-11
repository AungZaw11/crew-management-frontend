// src/features/crew/hooks/useCrewDetail.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrewById, deleteCrew } from "../services/crewSlice";
import toastHelper from "../../../utils/toastHelper";
import { useNavigate } from "react-router-dom";

export const useCrewDetail = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCrew, isLoading, error } = useSelector((state) => state.crew);
  const [crew, setCrew] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCrewById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCrew) {
      setCrew(selectedCrew);
    }
  }, [selectedCrew]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCrew(id)).unwrap();
      toastHelper.success("Crew member deleted successfully!");
      navigate("/crew");
    } catch (error) {
      toastHelper.error(error.message || "Failed to delete crew member");
    }
  };

  return {
    crew,
    isLoading,
    error,
    deleteCrew: handleDelete,
  };
};