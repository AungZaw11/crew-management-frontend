// src/features/experience/components/ExperienceShipTypeField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const SHIP_TYPE_OPTIONS = [
  "Bulk Carrier",
  "Container Ship",
  "Tanker",
  "Passenger Ship",
  "Ro-Ro Ship",
  "LNG Carrier",
  "Offshore Vessel",
  "Fishing Vessel",
  "Tugboat",
  "Others",
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function ExperienceShipTypeField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("ship_type") || "Ship Type"}</FieldLabel>
      <div className="relative">
        <select
          name="shipType"
          value={value}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
        >
          <option value="">
            {t("select_ship_type") || "Select Ship Type..."}
          </option>
          {SHIP_TYPE_OPTIONS.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}