// src/features/qualification/hooks/useQualification.js
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createQualification, updateQualification } from "../services/qualificationSlice";
import toastHelper from "../../../utils/toastHelper";

export const useQualification = (initialData = null, crewId = null) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData || {
    certificateName: "",
    trainingDate: "",
    expiration: "",
    expireDate: "",
    certificateType: "",
    licenseNumber: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const isEditing = !!initialData?.id;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleFileUpload = useCallback((file) => {
    setUploadedFile(file);
    toastHelper.success("File uploaded successfully!");
  }, []);

  const handleFileRemove = useCallback(() => {
    setUploadedFile(null);
    toastHelper.info("File removed");
  }, []);

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
      isEditing ? "Updating qualification..." : "Saving qualification..."
    );

    try {
      const payload = { ...formData };
      if (crewId) {
        payload.crewId = crewId;
      }

      let result;
      if (isEditing) {
        result = await dispatch(updateQualification({ id: formData.id, data: payload })).unwrap();
      } else {
        result = await dispatch(createQualification(payload)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEditing ? "Qualification updated successfully!" : "Qualification saved successfully!"
      );
      navigate(-1);
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEditing ? "Failed to update qualification" : "Failed to save qualification")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEditing, crewId, validate, dispatch, navigate]);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    formData,
    setFormData,
    errors,
    isLoading,
    isEditing,
    uploadedFile,
    handleChange,
    handleFileUpload,
    handleFileRemove,
    handleSave,
    handleCancel,
  };
};