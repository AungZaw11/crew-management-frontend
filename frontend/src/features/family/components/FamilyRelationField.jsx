// src/features/family/components/FamilyRelationField.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const RELATION_OPTIONS = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Cousin",
  "Nephew",
  "Niece",
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

export default function FamilyRelationField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel required={true}>
        {t("relation") || "Relation"}
      </FieldLabel>
      <div className="relative">
        <select
          name="relation"
          value={value}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
          required
        >
          <option value="">
            {t("select_relation") || "Select Relation..."}
          </option>
          {RELATION_OPTIONS.map((relation, index) => (
            <option key={index} value={relation}>
              {relation}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}