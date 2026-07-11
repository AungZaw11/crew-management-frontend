// src/features/experience/hooks/useExperience.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createExperience, updateExperience, fetchExperienceById } from "../services/experienceSlice";
import toastHelper from "../../../utils/toastHelper";

export const useExperience = (initialData = null, onSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // State
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux State
  const { selectedExperience, isLoading: isFetching } = useSelector(
    (state) => state.experience
  );

  // ===== LOAD DATA FOR EDIT =====
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchExperienceById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedExperience) {
      setFormData(selectedExperience);
    }
  }, [isEdit, selectedExperience]);

  // ===== HANDLE CHANGE =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // ===== VALIDATE =====
  const validate = useCallback(() => {
    const newErrors = {};
    const requiredFields = [
      { key: "company", label: "Company Name" },
      { key: "ship", label: "Ship Name" },
      { key: "rank", label: "Rank" },
      { key: "boardLeave", label: "Board/Leave" },
      { key: "boardingDate", label: "Boarding Date" },
      { key: "leavingDate", label: "Leaving Date" },
    ];

    let hasError = false;
    requiredFields.forEach((field) => {
      const value = formData[field.key];
      if (!value || value.trim() === "") {
        newErrors[field.key] = `${field.label} is required`;
        hasError = true;
      }
    });

    // Check if leaving date is after boarding date
    if (formData.boardingDate && formData.leavingDate) {
      const boardDate = new Date(formData.boardingDate);
      const leaveDate = new Date(formData.leavingDate);
      if (leaveDate < boardDate) {
        newErrors.leavingDate = "Leaving date must be after boarding date";
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError) {
      toastHelper.validation(newErrors);
    }
    return !hasError;
  }, [formData]);

  // ===== HANDLE SAVE =====
  const handleSave = useCallback(async () => {
    if (!validate()) {
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
      return;
    }

    setIsLoading(true);
    const toastId = toastHelper.loading(
      isEdit ? "Updating experience..." : "Saving experience..."
    );

    try {
      let result;
      if (isEdit) {
        result = await dispatch(updateExperience({ id, data: formData })).unwrap();
      } else {
        result = await dispatch(createExperience(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEdit ? "Experience updated successfully!" : "Experience saved successfully!"
      );

      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate("/crew/experience");
      }
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEdit ? "Failed to update experience" : "Failed to save experience")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEdit, id, validate, dispatch, navigate, onSuccess]);

  // ===== HANDLE CANCEL =====
  const handleCancel = useCallback(() => {
    navigate("/crew/experience");
  }, [navigate]);

  return {
    formData,
    setFormData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  };
};