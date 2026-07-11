// src/features/personal-info/components/PersonalInfoForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import AvatarUpload from "./AvatarUpload";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import DetailsInfoSection from "./DetailsInfoSection";
import DocumentsSection from "./DocumentsSection";

function SectionHeader({ title }) {
  return (
    <div className="flex items-center bg-[#EFF6FF] px-6 py-2.5">
      <h2 className="text-[17px] font-medium text-[#3C5065]">{title}</h2>
    </div>
  );
}

export default function PersonalInfoForm({
  crewMember = {},
  isEditing = true,
  onChange,
  onSave,
  onCancel,
  errors = {},
  isLoading = false,
  avatarPreview = null,
  avatarFile = null,
  onFileUpload,
  onRemoveAvatar,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0px_4px_4px_rgba(79,129,189,0.25)]">
        
        {/* Avatar Upload */}
        <AvatarUpload
          avatarPreview={avatarPreview}
          isEditing={isEditing}
          onFileUpload={onFileUpload}
          onRemoveAvatar={onRemoveAvatar}
        />

        {/* Personal Information */}
        <SectionHeader title={t("personal_info") || "Personal Information"} />
        <PersonalInfoSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* Contact Information */}
        <SectionHeader title={t("contact_info") || "Contact Information"} />
        <ContactInfoSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* Details Information */}
        <SectionHeader title={t("details_info") || "Details Information"} />
        <DetailsInfoSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* Documents */}
        <DocumentsSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* Action Bar */}
        {isEditing && (
          <div className="mt-8 flex flex-wrap items-center justify-end gap-4 p-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="rounded-md border border-gray-200 bg-white px-8 py-2.5 text-sm text-[#3C5065] hover:bg-slate-50 disabled:opacity-50"
                disabled={isLoading}
              >
                {t("cancel") || "Cancel"}
              </button>
              <button
                onClick={onSave}
                className="rounded-md bg-[#002F67] px-10 py-2.5 text-sm font-medium text-white hover:bg-[#00397e] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : t("save") || "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}