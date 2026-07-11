// src/features/personal-info/components/PersonalInfoSection.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FormField from "../../../common/components/FormField";

export default function PersonalInfoSection({
  crewMember,
  onChange,
  isEditing,
  errors,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col border-b border-gray-200 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <FormField
          label={t("crew_code") || "Crew Code"}
          value={crewMember.crew_code}
          onChange={onChange}
          name="crew_code"
          isEditing={isEditing}
          required={true}
          error={errors.crew_code}
        />
        <FormField
          label={t("position") || "Position"}
          value={crewMember.rank || ""}
          onChange={onChange}
          name="rank"
          type="select"
          options={["Pilot", "Chief Officer", "Able Seaman", "Engineer"]}
          placeholder={t("select_position") || "Please select position"}
          isEditing={isEditing}
          required={true}
          error={errors.rank}
        />
        <FormField
          label={t("hire_date") || "Hire Date"}
          value={crewMember.hire_date || ""}
          onChange={onChange}
          name="hire_date"
          type="date"
          isEditing={isEditing}
          required={true}
          error={errors.hire_date}
        />
        <FormField
          label={t("name_english") || "Name (English)"}
          value={crewMember.name_eng || ""}
          onChange={onChange}
          name="name_eng"
          isEditing={isEditing}
        />
        <FormField
          label={t("name_korean") || "Name (Korean)"}
          value={crewMember.name_kor || ""}
          onChange={onChange}
          name="name_kor"
          isEditing={isEditing}
        />
        <FormField
          label={t("name_chinese") || "Name (Chinese)"}
          value={crewMember.name_chinese || ""}
          onChange={onChange}
          name="name_chinese"
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}