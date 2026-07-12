// src/features/family/pages/FamilyEditPage.jsx
import React from "react";
import { useFamily } from "../hooks/useFamily";
import FamilyForm from "../components/FamilyForm";

export default function FamilyEditPage() {
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  } = useFamily(null);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading family member...</p>
        </div>
      </div>
    );
  }

  return (
    <FamilyForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"
      isLoading={isLoading}
    />
  );
}