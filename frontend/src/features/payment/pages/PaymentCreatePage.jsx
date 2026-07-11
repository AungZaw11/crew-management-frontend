// src/features/payment/pages/PaymentCreatePage.jsx
import React from "react";
import { usePayment } from "../hooks/usePayment";
import PaymentForm from "../components/PaymentForm";

export default function PaymentCreatePage() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = usePayment(null);

  return (
    <PaymentForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="create"
      isLoading={isLoading}
    />
  );
}