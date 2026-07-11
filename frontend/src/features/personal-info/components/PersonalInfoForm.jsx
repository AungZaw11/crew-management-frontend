// src/features/personal-info/components/PersonalInfoForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import DetailsInfoSection from "./DetailsInfoSection";
import DocumentsSection from "./DocumentsSection";
import FormActions from "./FormActions";

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
  crewId, // ✅ crewId ကိုထည့်ပါ
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0px_4px_4px_rgba(79,129,189,0.25)]">
        
        {/* ===== Personal Information (Avatar + Fields) ===== */}
        <SectionHeader title={t("personal_info") || "Personal Information"} />
        <PersonalInfoSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
          avatarPreview={avatarPreview}
          onFileUpload={onFileUpload}
          onRemoveAvatar={onRemoveAvatar}
        />

        {/* ===== Contact Information ===== */}
        <SectionHeader title={t("contact_info") || "Contact Information"} />
        <ContactInfoSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* ===== Details Information ===== */}
        <SectionHeader title={t("details_info") || "Details Information"} />
        <DetailsInfoSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* ===== Documents ===== */}
        <DocumentsSection
          crewMember={crewMember}
          onChange={onChange}
          isEditing={isEditing}
          errors={errors}
        />

        {/* ===== Form Actions ===== */}
        {isEditing ? (
          <FormActions
            isEditing={isEditing}
            isLoading={isLoading}
            onSave={onSave}
            onCancel={onCancel}
          />
        ) : (
          // ✅ View Mode - Edit Button ထည့်ပါ
          <div className="mt-8 flex flex-wrap items-center justify-end gap-4 p-6 border-t border-gray-200">
            <button
              onClick={() => navigate(`/crew/${crewId}/edit`)}
              className="flex items-center gap-2 rounded-md bg-[#002F67] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#00397e] transition-colors"
            >
              <Edit size={16} />
              {t("edit") || "Edit Profile"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}