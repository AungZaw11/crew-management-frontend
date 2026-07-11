// src/features/payment/components/PaymentBankField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

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

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function PaymentBankField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel required={true}>
        {t("bank_name") || "Bank Name"}
      </FieldLabel>
      <div className="relative">
        <select
          name="bank"
          value={value}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
          required
        >
          <option value="">
            {t("select_bank") || "Select Bank..."}
          </option>
          {BANK_OPTIONS.map((bank, index) => (
            <option key={index} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}