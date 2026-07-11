FamilyCreatePage.jsx
// src/features/family/pages/FamilyCreatePage.jsx
import React from "react";
import { useFamily } from "../hooks/useFamily";
import FamilyForm from "../components/FamilyForm";

export default function FamilyCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useFamily(null);

  return (
    <FamilyForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}