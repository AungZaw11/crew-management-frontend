QualificationEditPage.jsx// src/features/qualification/pages/QualificationEditPage.jsx
import React from "react";
import { useQualification } from "../hooks/useQualification";
import QualificationForm from "../components/QualificationForm";

export default function QualificationEditPage() {
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  } = useQualification(null);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading qualification...</p>
        </div>
      </div>
    );
  }

  return (
    <QualificationForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"
      isLoading={isLoading}
    />
  );
}