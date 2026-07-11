// src/features/qualification/hooks/useQualification.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createQualification, updateQualification, fetchQualificationById } from "../services/qualificationSlice";
import toastHelper from "../../../utils/toastHelper";

export const useQualification = (initialData = null, onSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // State
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux State
  const { selectedQualification, isLoading: isFetching } = useSelector(
    (state) => state.qualification
  );

  // ===== LOAD DATA FOR EDIT =====
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchQualificationById(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedQualification) {
      setFormData(selectedQualification);
    }
  }, [isEdit, selectedQualification]);

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
      { key: "certificateName", label: "Certificate Name" },
      { key: "licenseNumber", label: "License Number" },
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
      isEdit ? "Updating qualification..." : "Saving qualification..."
    );

    try {
      let result;
      if (isEdit) {
        result = await dispatch(updateQualification({ id, data: formData })).unwrap();
      } else {
        result = await dispatch(createQualification(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEdit ? "Qualification updated successfully!" : "Qualification saved successfully!"
      );

      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate("/crew/qualification");
      }
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEdit ? "Failed to update qualification" : "Failed to save qualification")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEdit, id, validate, dispatch, navigate, onSuccess]);

  // ===== HANDLE CANCEL =====
  const handleCancel = useCallback(() => {
    navigate("/crew/qualification");
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