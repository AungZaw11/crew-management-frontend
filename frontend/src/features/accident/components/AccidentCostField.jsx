// src/features/accident/components/AccidentCostField.jsx
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

export default function AccidentCostField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("accident_cost") || "Accident Cost"}</FieldLabel>
      <input
        type="number"
        name="accidentCost"
        value={value}
        onChange={onChange}
        placeholder="0"
        className={`h-[41px] w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-200"
        } bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}