// src/features/qualification/pages/QualificationCreatePage.jsx
import React from "react";
import { useQualification } from "../hooks/useQualification";
import QualificationForm from "../components/QualificationForm";

export default function QualificationCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useQualification(null);

  return (
    <QualificationForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}