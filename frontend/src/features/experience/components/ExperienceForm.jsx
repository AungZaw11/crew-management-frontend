// src/features/experience/components/ExperienceForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import ExperienceCompanyField from "./ExperienceCompanyField";
import ExperienceShipField from "./ExperienceShipField";
import ExperienceRankField from "./ExperienceRankField";
import ExperienceBoardingDateField from "./ExperienceBoardingDateField";
import ExperienceLeavingDateField from "./ExperienceLeavingDateField";
import ExperienceAreaField from "./ExperienceAreaField";
import ExperienceShipTypeField from "./ExperienceShipTypeField";
import ExperienceBoardLeaveField from "./ExperienceBoardLeaveField";
import ExperienceGrtField from "./ExperienceGrtField";
import ExperienceKwField from "./ExperienceKwField";
import ExperienceRemarksField from "./ExperienceRemarksField";
import ExperienceActions from "./ExperienceActions";

export default function ExperienceForm({
  formData = {},
  onChange,
  onSave,
  onCancel,
  errors = {},
  isLoading = false,
  isEditing = false,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        {/* Header */}
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {isEditing
              ? t("edit_experience") || "Edit Experience"
              : t("new_experience") || "New Experience"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-3">
            
            {/* Row 1: Company Name */}
            <ExperienceCompanyField
              value={formData?.company || ""}
              onChange={onChange}
              error={errors?.company}
            />

            {/* Row 1: Ship Name */}
            <ExperienceShipField
              value={formData?.ship || ""}
              onChange={onChange}
              error={errors?.ship}
            />

            {/* Row 1: Rank */}
            <ExperienceRankField
              value={formData?.rank || ""}
              onChange={onChange}
              error={errors?.rank}
            />

            {/* Row 2: Boarding Date */}
            <ExperienceBoardingDateField
              value={formData?.boardingDate || ""}
              onChange={onChange}
              error={errors?.boardingDate}
            />

            {/* Row 2: Leaving Date */}
            <ExperienceLeavingDateField
              value={formData?.leavingDate || ""}
              onChange={onChange}
              error={errors?.leavingDate}
            />

            {/* Row 2: Area */}
            <ExperienceAreaField
              value={formData?.area || ""}
              onChange={onChange}
              error={errors?.area}
            />

            {/* Row 3: Ship Type */}
            <ExperienceShipTypeField
              value={formData?.shipType || ""}
              onChange={onChange}
              error={errors?.shipType}
            />

            {/* Row 3: Board/Leave */}
            <ExperienceBoardLeaveField
              value={formData?.boardLeave || ""}
              onChange={onChange}
              error={errors?.boardLeave}
            />

            {/* Row 3: GRT */}
            <ExperienceGrtField
              value={formData?.grt || ""}
              onChange={onChange}
              error={errors?.grt}
            />

            {/* Row 4: KW - Full Width */}
            <div className="md:col-span-1.5">
              <ExperienceKwField
                value={formData?.kw || ""}
                onChange={onChange}
                error={errors?.kw}
              />
            </div>

            {/* Row 5: Remarks - Full Width */}
            <div className="md:col-span-2">
              <ExperienceRemarksField
                value={formData?.remarks || ""}
                onChange={onChange}
                error={errors?.remarks}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <ExperienceActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}