// src/features/qualification/components/RemarksField.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FieldLabel from "./FieldLabel";

export default function RemarksField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("remarks") || "Remarks"}</FieldLabel>
      <textarea
        name="remarks"
        value={value || ""}
        onChange={onChange}
        placeholder={t("enter_remarks") || "Fill Remarks"}
        rows={7}
        className={`w-full resize-none rounded-md border ${
          error ? "border-red-500" : "border-gray-200"
        } bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}