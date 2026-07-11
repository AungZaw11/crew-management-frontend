// src/features/appointment/components/AppointmentForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SectionHeader from "./SectionHeader";
import DeploymentDivisionField from "./DeploymentDivisionField";
import DeploymentContentField from "./DeploymentContentField";
import ShipNameField from "./ShipNameField";
import RankField from "./RankField";
import BoardingDateField from "./BoardingDateField";
import LeavingDateField from "./LeavingDateField";
import BoardingPeriodField from "./BoardingPeriodField";
import PlaceField from "./PlaceField";
import ContractTypeField from "./ContractTypeField";
import RemarksField from "./RemarksField";
import FormActions from "./FormActions";

export default function AppointmentForm({
  formData = {},
  onChange,
  onSave,
  onCancel,
  errors = {},
  isLoading = false,
  isEditing = false,
}) {
  const { t } = useLanguage();

  const isSignOn = formData?.division === "sign_on";
  const isSignOff = formData?.division === "sign_off";

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        
        {/* Header */}
        <SectionHeader
          title={
            isEditing
              ? t("edit_appointment") || "Edit Appointment"
              : t("new_appointment") || "New Appointment"
          }
        />

        {/* Form Body */}
        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* Deployment Division */}
            <DeploymentDivisionField
              value={formData?.division || ""}
              onChange={onChange}
              error={errors?.division}
            />

            {/* Deployment Content */}
            <DeploymentContentField
              value={formData?.content || ""}
              division={formData?.division || ""}
              onChange={onChange}
              error={errors?.content}
            />

            {/* Ship Name */}
            <ShipNameField
              value={formData?.ship || ""}
              onChange={onChange}
              error={errors?.ship}
            />

            {/* Rank */}
            <RankField
              value={formData?.rank || ""}
              onChange={onChange}
              error={errors?.rank}
            />

            {/* Boarding Date */}
            {(isSignOn || !formData?.division) && (
              <BoardingDateField
                value={formData?.boardingDate || ""}
                onChange={onChange}
                error={errors?.boardingDate}
                required={isSignOn}
              />
            )}

            {/* Leaving Date */}
            {isSignOff && (
              <LeavingDateField
                value={formData?.leavingDate || ""}
                onChange={onChange}
                error={errors?.leavingDate}
              />
            )}

            {/* Boarding Period */}
            <BoardingPeriodField
              value={formData?.boardingPeriod || ""}
              onChange={onChange}
              error={errors?.boardingPeriod}
            />

            {/* Place */}
            <PlaceField
              value={formData?.place || ""}
              onChange={onChange}
              error={errors?.place}
            />

            {/* Contract Type */}
            <ContractTypeField
              value={formData?.contractType || ""}
              onChange={onChange}
              error={errors?.contractType}
            />

            {/* Remarks - Full Width */}
            <div className="md:col-span-2">
              <RemarksField
                value={formData?.remarks || ""}
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