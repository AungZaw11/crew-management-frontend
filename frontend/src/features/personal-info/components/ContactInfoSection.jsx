// src/features/personal-info/components/ContactInfoSection.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FormField from "../../../common/components/FormField";

export default function ContactInfoSection({
  crewMember,
  onChange,
  isEditing,
  errors,
}) {
  const { t } = useLanguage();

  return (
    <div className="border-b border-gray-200 p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField
          label={t("address_eng") || "Address (English)"}
          value={crewMember.address || ""}
          onChange={onChange}
          name="address"
          isEditing={isEditing}
          required={true}
          error={errors.address}
        />
        <FormField
          label={t("address_korean") || "Address (Korean)"}
          value={crewMember.address_kor || ""}
          onChange={onChange}
          name="address_kor"  
          isEditing={isEditing}
          required={false}
          error={errors.address_kor}
        /> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <FormField
          label={t("phone") || "Phone Number"}
          value={crewMember.phone || ""}
          onChange={onChange}
          name="phone"
          isEditing={isEditing}
          required={true}
          error={errors.phone}
        />
        <FormField
          label={t("mobile") || "Mobile Number"}
          value={crewMember.mobile || ""}
          onChange={onChange}
          name="mobile"
          isEditing={isEditing}
          required={true}
          error={errors.mobile}
        />
        <FormField
          label={t("email") || "Email Address"}
          value={crewMember.email || ""}
          onChange={onChange}
          name="email"
          isEditing={isEditing}
          required={true}
          error={errors.email}
        />
        <FormField
          label={t("emergency_1") || "Emergency Contact 1"}
          value={crewMember.emergency_1 || ""}
          onChange={onChange}
          name="emergency_1"
          isEditing={isEditing}
        />
        <FormField
          label={t("emergency_2") || "Emergency Contact 2"}
          value={crewMember.emergency_2 || ""}
          onChange={onChange}
          name="emergency_2"
          isEditing={isEditing}
        />
        <FormField
          label={t("resident_id") || "Resident Registration Number"}
          value={crewMember.resident_id || ""}
          onChange={onChange}
          name="resident_id"
          required={true}
          isEditing={isEditing}
          error={errors.resident_id}
        />
      </div>
    </div>
  );
}