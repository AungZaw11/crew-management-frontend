// src/features/qualification/components/CertificateTypeField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FieldLabel from "./FieldLabel";

const CERTIFICATE_TYPE_OPTIONS = [
  { value: "personal", label: "Personal" },
  { value: "company", label: "Company" },
  { value: "government", label: "Government" },
  { value: "international", label: "International" },
];

export default function CertificateTypeField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("certificate_type") || "Certificate Type"}</FieldLabel>
      <div className="relative">
        <select
          name="certificateType"
          value={value || ""}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
        >
          <option value="">
            {t("select_certificate_type") || "Select Certificate Type..."}
          </option>
          {CERTIFICATE_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}