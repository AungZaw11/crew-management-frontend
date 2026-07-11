// src/features/health/pages/HealthCreatePage.jsx
import React from "react";
import { useHealth } from "../hooks/useHealth";
import HealthForm from "../components/HealthForm";

export default function HealthCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useHealth(null);

  return (
    <HealthForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}