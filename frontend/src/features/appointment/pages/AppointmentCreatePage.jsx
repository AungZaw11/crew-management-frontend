// src/features/appointment/pages/AppointmentCreatePage.jsx
import React from "react";
import { useAppointment } from "../hooks/useAppointment";
import AppointmentForm from "../components/AppointmentForm";

export default function AppointmentCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useAppointment(null);

  return (
    <AppointmentForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}