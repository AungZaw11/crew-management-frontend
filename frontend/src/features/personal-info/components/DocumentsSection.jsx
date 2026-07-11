// src/features/personal-info/components/DocumentsSection.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FormField from "../../../common/components/FormField";

export default function DocumentsSection({
  crewMember,
  onChange,
  isEditing,
  errors,
}) {
  const { t } = useLanguage();

  return (
    <div className="border-t border-gray-200 bg-[#FBFDFF] p-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        <FormField
          label={t("mariners_license") || "Mariner's License"}
          value={crewMember.mariners_license || ""}
          onChange={onChange}
          name="mariners_license"
          isEditing={isEditing}
          required={false}
          error={errors.mariners_license}
          placeholder={t("enter_license") || "Enter license number"}
        />
        <FormField
          label={t("passport") || "Passport"}
          value={crewMember.passport || ""}
          onChange={onChange}
          name="passport"
          isEditing={isEditing}
          required={false}
          error={errors.passport}
          placeholder={t("enter_passport") || "Enter passport number"}
        />
        <FormField
          label={t("telecom_license") || "Telecommunications License"}
          value={crewMember.telecom_license || ""}
          onChange={onChange}
          name="telecom_license"
          isEditing={isEditing}
          placeholder={t("enter_telecom") || "Enter telecom license"}
        />
        <FormField
          label={t("physical_exam") || "Physical Examination"}
          value={crewMember.physical_exam || ""}
          onChange={onChange}
          name="physical_exam"
          isEditing={isEditing}
          placeholder={t("enter_physical") || "Enter physical exam date"}
        />
        <FormField
          label={t("seaman_handbook") || "Seaman's Handbook"}
          value={crewMember.seaman_handbook || ""}
          onChange={onChange}
          name="seaman_handbook"
          isEditing={isEditing}
          placeholder={t("enter_handbook") || "Enter handbook number"}
        />
        <FormField
          label={t("contract_period") || "Employment Contract Period"}
          value={crewMember.contract_period || ""}
          onChange={onChange}
          name="contract_period"
          isEditing={isEditing}
          placeholder={t("enter_contract") || "Enter contract period"}
        />
      </div>
    </div>
  );
}