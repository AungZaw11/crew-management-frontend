// src/features/qualification/components/QualificationForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SectionHeader from "./SectionHeader";
import CertificateNameField from "./CertificateNameField";
import TrainingDateField from "./TrainingDateField";
import AttachFileField from "./AttachFileField";
import UploadedFileCard from "./UploadedFileCard";
import ExpirationField from "./ExpirationField";
import ExpireDateField from "./ExpireDateField";
import CertificateTypeField from "./CertificateTypeField";
import LicenseNumberField from "./LicenseNumberField";
import RemarksField from "./RemarksField";
import FormActions from "./FormActions";

export default function QualificationForm({
  formData = {},
  onChange,
  onSave,
  onCancel,
  errors = {},
  isLoading = false,
  isEditing = false,
  uploadedFile = null,
  onFileUpload,
  onFileRemove,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        
        {/* Header */}
        <SectionHeader
          title={
            isEditing
              ? t("edit_qualification") || "Edit Qualification"
              : t("new_qualification") || "New Qualification"
          }
        />

        {/* Form Body */}
        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-7">
              <CertificateNameField
                value={formData?.certificateName}
                onChange={onChange}
                error={errors?.certificateName}
              />
              <TrainingDateField
                value={formData?.trainingDate}
                onChange={onChange}
                error={errors?.trainingDate}
              />
              <AttachFileField
                onFileUpload={onFileUpload}
                error={errors?.attachFile}
              />
              <UploadedFileCard
                file={uploadedFile}
                onFileRemove={onFileRemove}
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-7">
              <ExpirationField
                value={formData?.expiration}
                onChange={onChange}
                error={errors?.expiration}
              />
              <ExpireDateField
                value={formData?.expireDate}
                onChange={onChange}
                error={errors?.expireDate}
              />
              <CertificateTypeField
                value={formData?.certificateType}
                onChange={onChange}
                error={errors?.certificateType}
              />
              <LicenseNumberField
                value={formData?.licenseNumber}
                onChange={onChange}
                error={errors?.licenseNumber}
              />
              <RemarksField
                value={formData?.remarks}
                onChange={onChange}
                error={errors?.remarks}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <FormActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}