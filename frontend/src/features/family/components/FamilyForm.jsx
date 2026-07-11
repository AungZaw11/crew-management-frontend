// src/features/family/components/FamilyForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FamilyNameField from "./FamilyNameField";
import FamilyRelationField from "./FamilyRelationField";
import FamilyBirthField from "./FamilyBirthField";
import FamilyRemarksField from "./FamilyRemarksField";
import FamilyActions from "./FamilyActions";

export default function FamilyForm({
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
              ? t("edit_family_member") || "Edit Family Member"
              : t("add_family_member") || "Add Family Member"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* Name */}
            <FamilyNameField
              value={formData?.name || ""}
              onChange={onChange}
              error={errors?.name}
            />

            {/* Relation */}
            <FamilyRelationField
              value={formData?.relation || ""}
              onChange={onChange}
              error={errors?.relation}
            />

            {/* Birth */}
            <FamilyBirthField
              value={formData?.birth || ""}
              onChange={onChange}
              error={errors?.birth}
            />



            {/* Remarks - Full Width */}
            <div className="md:col-span-1">
              <FamilyRemarksField
                value={formData?.remarks || ""}
                onChange={onChange}
                error={errors?.remarks}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <FamilyActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}