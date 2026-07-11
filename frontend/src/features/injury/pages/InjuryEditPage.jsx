// src/features/injury/pages/InjuryEditPage.jsx
import React from "react";
import { useInjury } from "../hooks/useInjury";
import InjuryForm from "../components/InjuryForm";

export default function InjuryEditPage() {
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  } = useInjury(null);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading injury record...</p>
        </div>
      </div>
    );
  }

  return (
    <InjuryForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"
      isLoading={isLoading}
    />
  );
}