// src/features/appointment/components/ContractTypeField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FieldLabel from "./FieldLabel";

const CONTRACT_OPTIONS = [
  { value: "permanent", label: "Permanent" },
  { value: "day_worker", label: "Day Worker" },
];

export default function ContractTypeField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("contract_type") || "Contract Type"}</FieldLabel>
      <div className="relative">
        <select
          name="contractType"
          value={value}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
        >
          <option value="">
            {t("select_contract") || "Select Contract Type..."}
          </option>
          {CONTRACT_OPTIONS.map((contract) => (
            <option key={contract.value} value={contract.value}>
              {contract.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}