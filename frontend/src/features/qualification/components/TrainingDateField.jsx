// src/features/qualification/components/TrainingDateField.jsx
import React from "react";
import { Calendar } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FieldLabel from "./FieldLabel";

export default function TrainingDateField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("training_date") || "Training Date"}</FieldLabel>
      <div className="relative">
        <input
          type="date"
          name="trainingDate"
          value={value || ""}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
        />
    
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}