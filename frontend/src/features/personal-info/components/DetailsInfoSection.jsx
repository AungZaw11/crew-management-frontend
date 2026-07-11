// src/features/personal-info/components/DetailsInfoSection.jsx
import React from "react";
import { CheckSquare } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FormField from "../../../common/components/FormField";

export default function DetailsInfoSection({
  crewMember,
  onChange,
  isEditing,
  errors,
}) {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        <FormField
          label={t("birth_date") || "Birth Date"}
          value={crewMember.birth_date || ""}
          onChange={onChange}
          name="birth_date"
          type="date"
          isEditing={isEditing}
          required={true}
          error={errors.birth_date}
        />
        <FormField
          label={t("nationality") || "Nationality"}
          value={crewMember.nationality || ""}
          onChange={onChange}
          name="nationality"
          type="select"
          options={["Myanmar", "Korean", "Other"]}
          placeholder={t("select_nationality") || "Please select nationality"}
          isEditing={isEditing}
          required={true}
          error={errors.nationality}
        />
        <FormField
          label={t("religion") || "Religion"}
          value={crewMember.religion || ""}
          onChange={onChange}
          name="religion"
          isEditing={isEditing}
        />
        <FormField
          label={t("education_university") || "Education(University)"}
          value={crewMember.education_university || ""}
          onChange={onChange}
          name="education_university"
          isEditing={isEditing}
        />
        <FormField
          label={t("education_school") || "Education(School)"}
          value={crewMember.education_school || ""}
          onChange={onChange}
          name="education_school"
          isEditing={isEditing}
        />
        <FormField
          label={t("boarding_vessel") || "Boarding Vessel"}
          value={crewMember.vessel || ""}
          onChange={onChange}
          name="vessel"
          required={true}
          isEditing={isEditing}
          error={errors.vessel}
        />
        <FormField
          label={t("waist") || "Waist"}
          suffix="inch"
          value={crewMember.waist || ""}
          onChange={onChange}
          name="waist"
          isEditing={isEditing}
        />
        <FormField
          label={t("safety_shoes") || "Safety Shoes"}
          suffix="mm"
          value={crewMember.safety_shoes || ""}
          onChange={onChange}
          name="safety_shoes"
          isEditing={isEditing}
        />
        <FormField
          label={t("garments") || "Garments"}
          value={crewMember.garments || ""}
          onChange={onChange}
          name="garments"
          isEditing={isEditing}
        />
        <FormField
          label={t("drinking") || "Drinking (Capacity)"}
          value={crewMember.drinking || ""}
          onChange={onChange}
          name="drinking"
          isEditing={isEditing}
        />
        <FormField
          label={t("smoking") || "Smoking"}
          value={crewMember.smoking || ""}
          onChange={onChange}
          name="smoking"
          isEditing={isEditing}
        />
        <div className="flex items-end pb-2.5">
          <label className="flex cursor-pointer items-center gap-4 text-sm text-[#3C5065]">
            <CheckSquare className="h-6 w-6 text-[#002F67]" />
            {t("long_service") || "long service"}
          </label>
        </div>
        <FormField
          label={t("monthly_position") || "Monthly Position"}
          value={crewMember.monthly_position || ""}
          onChange={onChange}
          name="monthly_position"
          isEditing={isEditing}
        />
        <FormField
          label={t("chemical") || "Chemical"}
          value={crewMember.chemical || ""}
          onChange={onChange}
          name="chemical"
          isEditing={isEditing}
        />
        <FormField
          label={t("tanker") || "Tanker"}
          value={crewMember.tanker || ""}
          onChange={onChange}
          name="tanker"
          isEditing={isEditing}
        />
        <FormField
          label={t("watch_office") || "Watch Office"}
          value={crewMember.watch_office || ""}
          onChange={onChange}
          name="watch_office"
          isEditing={isEditing}
        />
        <FormField
          label={t("note") || "Note"}
          value={crewMember.note || ""}
          onChange={onChange}
          name="note"
          type="textarea"
          className="md:col-span-2"
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}