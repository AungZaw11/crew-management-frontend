// src/features/payment/pages/PaymentEditPage.jsx
import React from "react";
import { usePayment } from "../hooks/usePayment";
import PaymentForm from "../components/PaymentForm";

export default function PaymentEditPage() {
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    isEdit,
    handleChange,
    handleSave,
    handleCancel,
  } = usePayment(null);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment...</p>
        </div>
      </div>
    );
  }

  return (
    <PaymentForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"
      isLoading={isLoading}
    />
  );
}