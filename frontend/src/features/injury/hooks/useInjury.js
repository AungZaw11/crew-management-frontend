// src/features/injury/hooks/useInjury.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createInjury, updateInjury, fetchInjuryById } from "../services/injurySlice";
import toastHelper from "../../../utils/toastHelper";

export const useInjury = (initialData = null, onSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // State
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux State
  const { selectedInjury, isLoading: isFetching } = useSelector(
    (state) => state.injury
  );

  // ===== LOAD DATA FOR EDIT =====
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchInjuryById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedInjury) {
      setFormData(selectedInjury);
    }
  }, [isEdit, selectedInjury]);

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
      { key: "injuryType", label: "Injury Type" },
      { key: "bodyPart", label: "Body Part" },
      { key: "injuryDate", label: "Injury Date" },
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
      isEdit ? "Updating injury record..." : "Saving injury record..."
    );

    try {
      let result;
      if (isEdit) {
        result = await dispatch(updateInjury({ id, data: formData })).unwrap();
      } else {
        result = await dispatch(createInjury(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEdit ? "Injury record updated successfully!" : "Injury record saved successfully!"
      );

      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate("/crew/injury");
      }
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEdit ? "Failed to update injury record" : "Failed to save injury record")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEdit, id, validate, dispatch, navigate, onSuccess]);

  // ===== HANDLE CANCEL =====
  const handleCancel = useCallback(() => {
    navigate("/crew/injury");
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