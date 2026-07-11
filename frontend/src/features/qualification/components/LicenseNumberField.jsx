// src/features/qualification/components/LicenseNumberField.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function LicenseNumberField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-base font-medium text-[#315888]">
        {t("license_number") || "License Number"}
      </label>
      <input
        name="licenseNumber"
        value={value}
        onChange={onChange}
        placeholder={t("enter_license_number") || "Please Fill License Number"}
        className={`h-[41px] w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-200"
        } bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}