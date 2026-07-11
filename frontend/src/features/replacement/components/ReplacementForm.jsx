// src/features/replacement/components/ReplacementForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import ReplacementDivisionField from "./ReplacementDivisionField";
import ReplacementContentField from "./ReplacementContentField";
import ReplacementShipField from "./ReplacementShipField";
import ReplacementRankField from "./ReplacementRankField";
import ReplacementDateField from "./ReplacementDateField";
import ReplacementPlaceField from "./ReplacementPlaceField";
import ReplacementRemarksField from "./ReplacementRemarksField";
import ReplacementActions from "./ReplacementActions";

export default function ReplacementForm({
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
              ? t("edit_replacement") || "Edit Replacement"
              : t("new_replacement") || "New Replacement"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* Division */}
            <ReplacementDivisionField
              value={formData?.division || ""}
              onChange={onChange}
              error={errors?.division}
            />

            {/* Content */}
            <ReplacementContentField
              value={formData?.content || ""}
              division={formData?.division || ""}
              onChange={onChange}
              error={errors?.content}
            />

            {/* Ship */}
            <ReplacementShipField
              value={formData?.ship || ""}
              onChange={onChange}
              error={errors?.ship}
            />

            {/* Rank */}
            <ReplacementRankField
              value={formData?.rank || ""}
              onChange={onChange}
              error={errors?.rank}
            />

            {/* Date */}
            <ReplacementDateField
              value={formData?.date || ""}
              onChange={onChange}
              error={errors?.date}
            />

            {/* Place */}
            <ReplacementPlaceField
              value={formData?.place || ""}
              onChange={onChange}
              error={errors?.place}
            />

            {/* Remarks - Full Width */}
            <div className="md:col-span-2">
              <ReplacementRemarksField
                value={formData?.remarks || ""}
                onChange={onChange}
                error={errors?.remarks}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <ReplacementActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}