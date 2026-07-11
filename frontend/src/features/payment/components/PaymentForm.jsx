// src/features/payment/components/PaymentForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import PaymentBankField from "./PaymentBankField";
import PaymentAccountField from "./PaymentAccountField";
import PaymentHolderField from "./PaymentHolderField";
import PaymentRelationField from "./PaymentRelationField";
import PaymentActions from "./PaymentActions";


const BANK_OPTIONS = [
  "CB Bank",
  "KBZ Bank",
  "AYA Bank",
  "UAB Bank",
  "MAB Bank",
  "Yoma Bank",
  "AGD Bank",
  "Myanmar Citizens Bank",
  "Co-operative Bank",
  "Shinhan Bank",
  "Woori Bank",
  "Kookmin Bank",
  "Other",
];

// ===== RELATION OPTIONS =====
const RELATION_OPTIONS = [
  "Self",
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Cousin",
  "Nephew",
  "Niece",
  "Other",
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function PaymentForm({
  formData = {},
  onChange,
  onSave,
  onCancel,
  errors = {},
  isLoading = false,
  isEditing = false,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        {/* Header */}
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {isEditing
              ? t("edit_payment") || "Edit Payment"
              : t("new_payment") || "New Payment"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* Bank Name */}
            <PaymentBankField
              value={formData?.bank || ""}
              onChange={onChange}
              error={errors?.bank}
            />

            {/* Account Number */}
            <PaymentAccountField
              value={formData?.account || ""}
              onChange={onChange}
              error={errors?.account}
            />

            {/* Account Holder */}
            <PaymentHolderField
              value={formData?.holder || ""}
              onChange={onChange}
              error={errors?.holder}
            />

            {/* Relation */}
            <PaymentRelationField
              value={formData?.relation || ""}
              onChange={onChange}
              error={errors?.relation}
            />

        
            
          </div>
        </div>

        {/* Actions */}
        <PaymentActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}