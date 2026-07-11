// src/features/appointment/components/BoardingPeriodField.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FieldLabel from "./FieldLabel";

export default function BoardingPeriodField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("boarding_period") || "Boarding Period"}</FieldLabel>
      <input
        type="number"
        name="boardingPeriod"
        value={value}
        onChange={onChange}
        placeholder={t("enter_boarding_period") || "Enter boarding period"}
        className={`h-[41px] w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-200"
        } bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}