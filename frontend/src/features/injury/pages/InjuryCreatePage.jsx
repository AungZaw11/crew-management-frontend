// src/features/injury/pages/InjuryCreatePage.jsx
import React from "react";
import { useInjury } from "../hooks/useInjury";
import InjuryForm from "../components/InjuryForm";

export default function InjuryCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useInjury(null);

  return (
    <InjuryForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}