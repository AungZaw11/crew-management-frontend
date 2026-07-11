// src/features/payment/components/PaymentAccountField.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function PaymentAccountField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel required={true}>
        {t("account_number") || "Account Number"}
      </FieldLabel>
      <input
        name="account"
        value={value}
        onChange={onChange}
        placeholder={t("enter_account_number") || "Enter account number"}
        className={`h-[41px] w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-200"
        } bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
        required
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}