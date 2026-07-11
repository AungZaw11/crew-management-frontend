// src/features/accident/hooks/useAccident.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createAccident, updateAccident, fetchAccidentById } from "../services/accidentSlice";
import toastHelper from "../../../utils/toastHelper";

export const useAccident = (initialData = null, onSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // State
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux State
  const { selectedAccident, isLoading: isFetching } = useSelector(
    (state) => state.accident
  );

  // ===== LOAD DATA FOR EDIT =====
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchAccidentById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedAccident) {
      setFormData(selectedAccident);
    }
  }, [isEdit, selectedAccident]);

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
      { key: "shipName", label: "Ship's Name" },
      { key: "accidentDate", label: "Accident Date" },
      { key: "rank", label: "Rank" },
      { key: "accidentReason", label: "Accident Reason" },
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
      isEdit ? "Updating accident record..." : "Saving accident record..."
    );

    try {
      let result;
      if (isEdit) {
        result = await dispatch(updateAccident({ id, data: formData })).unwrap();
      } else {
        result = await dispatch(createAccident(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEdit ? "Accident record updated successfully!" : "Accident record saved successfully!"
      );

      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate("/crew/accident");
      }
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEdit ? "Failed to update accident record" : "Failed to save accident record")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEdit, id, validate, dispatch, navigate, onSuccess]);

  // ===== HANDLE CANCEL =====
  const handleCancel = useCallback(() => {
    navigate("/crew/accident");
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