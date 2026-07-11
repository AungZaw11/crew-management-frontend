// src/features/appointment/hooks/useAppointment.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAppointment, updateAppointment } from "../services/appointmentSlice";
import toastHelper from "../../../utils/toastHelper";

export const useAppointment = (initialData = null) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!initialData?.id;

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // Validate
  const validate = useCallback(() => {
    const newErrors = {};
    const requiredFields = [
      { key: "division", label: "Deployment Division" },
      { key: "content", label: "Deployment Content" },
      { key: "ship", label: "Ship's Name" },
      { key: "rank", label: "Rank" },
    ];

    let hasError = false;
    requiredFields.forEach((field) => {
      const value = formData[field.key];
      if (!value || value.trim() === "") {
        newErrors[field.key] = `${field.label} is required`;
        hasError = true;
      }
    });

    setErrors(newErrors);
    if (hasError) {
      toastHelper.validation(newErrors);
    }
    return !hasError;
  }, [formData]);

  // Handle save
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
      isEditing ? "Updating appointment..." : "Saving appointment..."
    );

    try {
      let result;
      if (isEditing) {
        result = await dispatch(updateAppointment({ id: formData.id, data: formData })).unwrap();
      } else {
        result = await dispatch(createAppointment(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEditing ? "Appointment updated successfully!" : "Appointment saved successfully!"
      );
      navigate(-1);
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEditing ? "Failed to update appointment" : "Failed to save appointment")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEditing, validate, dispatch, navigate]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    formData,
    setFormData,
    errors,
    isLoading,
    isEditing,
    handleChange,
    handleSave,
    handleCancel,
  };
};