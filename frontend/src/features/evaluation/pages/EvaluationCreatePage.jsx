// src/features/evaluation/pages/EvaluationCreatePage.jsx
import React from "react";
import { useEvaluation } from "../hooks/useEvaluation";
import EvaluationForm from "../components/EvaluationForm";

export default function EvaluationCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useEvaluation(null);

  return (
    <EvaluationForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}