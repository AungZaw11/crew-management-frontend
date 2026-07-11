// src/features/experience/pages/ExperienceCreatePage.jsx
import React from "react";
import { useExperience } from "../hooks/useExperience";
import ExperienceForm from "../components/ExperienceForm";

export default function ExperienceCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useExperience(null);

  return (
    <ExperienceForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}