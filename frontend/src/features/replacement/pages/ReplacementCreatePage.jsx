// src/features/replacement/pages/ReplacementCreatePage.jsx
import React from "react";
import { useReplacement } from "../hooks/useReplacement";
import ReplacementForm from "../components/ReplacementForm";

export default function ReplacementCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useReplacement(null);

  return (
    <ReplacementForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}