// src/features/accident/pages/AccidentCreatePage.jsx
import React from "react";
import { useAccident } from "../hooks/useAccident";
import AccidentForm from "../components/AccidentForm";

export default function AccidentCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useAccident(null);

  return (
    <AccidentForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}