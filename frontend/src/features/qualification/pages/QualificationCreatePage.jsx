// src/features/qualification/pages/QualificationCreatePage.jsx
import React from "react";
import { useQualification } from "../hooks/useQualification";
import QualificationForm from "../components/QualificationForm";

export default function QualificationCreatePage() {
  // ✅ useQualification Hook ကို သုံးပါ
  const {
    formData,
    errors,
    isLoading,
    isEditing,
    uploadedFile,
    handleChange,
    handleFileUpload,
    handleFileRemove,
    handleSave,
    handleCancel,
  } = useQualification(null, null);

  return (
    <QualificationForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      errors={errors}
      isLoading={isLoading}
      isEditing={isEditing}
      uploadedFile={uploadedFile}
      onFileUpload={handleFileUpload}     
      onFileRemove={handleFileRemove}     
    />
  );
}