// src/features/replacement/pages/ReplacementEditPage.jsx
import React from "react";
import { useReplacement } from "../hooks/useReplacement";
import ReplacementForm from "../components/ReplacementForm";

export default function ReplacementEditPage() {
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  } = useReplacement(null);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading replacement...</p>
        </div>
      </div>
    );
  }

  return (
    <ReplacementForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"
      isLoading={isLoading}
    />
  );
}