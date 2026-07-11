// src/features/health/hooks/useHealth.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createHealth, updateHealth, fetchHealthById } from "../services/healthSlice";
import toastHelper from "../../../utils/toastHelper";

export const useHealth = (initialData = null, onSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // State
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux State
  const { selectedHealth, isLoading: isFetching } = useSelector(
    (state) => state.health
  );

  // ===== LOAD DATA FOR EDIT =====
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchHealthById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedHealth) {
      setFormData(selectedHealth);
    }
  }, [isEdit, selectedHealth]);

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
      { key: "date", label: "Date" },
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
      isEdit ? "Updating health record..." : "Saving health record..."
    );

    try {
      let result;
      if (isEdit) {
        result = await dispatch(updateHealth({ id, data: formData })).unwrap();
      } else {
        result = await dispatch(createHealth(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEdit ? "Health record updated successfully!" : "Health record saved successfully!"
      );

      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate("/crew/health");
      }
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEdit ? "Failed to update health record" : "Failed to save health record")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEdit, id, validate, dispatch, navigate, onSuccess]);

  // ===== HANDLE CANCEL =====
  const handleCancel = useCallback(() => {
    navigate("/crew/health");
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