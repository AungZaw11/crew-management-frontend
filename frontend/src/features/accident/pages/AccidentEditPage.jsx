// src/features/accident/pages/AccidentEditPage.jsx
import React from "react";
import { useAccident } from "../hooks/useAccident";
import AccidentForm from "../components/AccidentForm";

export default function AccidentEditPage() {
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  } = useAccident(null);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accident record...</p>
        </div>
      </div>
    );
  }

  return (
    <AccidentForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"
      isLoading={isLoading}
    />
  );
}