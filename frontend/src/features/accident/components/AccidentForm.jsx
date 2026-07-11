// src/features/accident/components/AccidentForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import AccidentShipField from "./AccidentShipField";
import AccidentDateField from "./AccidentDateField";
import AccidentRankField from "./AccidentRankField";
import AccidentTypeField from "./AccidentTypeField";
import AccidentReasonField from "./AccidentReasonField";
import AccidentCostField from "./AccidentCostField";
import AccidentReuseField from "./AccidentReuseField";
import AccidentEtcField from "./AccidentEtcField";
import AccidentRemarksField from "./AccidentRemarksField";
import AccidentActions from "./AccidentActions";

export default function AccidentForm({
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
              ? t("edit_accident") || "Edit Accident"
              : t("add_accident") || "Add Accident"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* Ship's Name */}
            <AccidentShipField
              value={formData?.shipName || ""}
              onChange={onChange}
              error={errors?.shipName}
            />

            {/* Accident Date */}
            <AccidentDateField
              value={formData?.accidentDate || ""}
              onChange={onChange}
              error={errors?.accidentDate}
            />

            {/* Rank */}
            <AccidentRankField
              value={formData?.rank || ""}
              onChange={onChange}
              error={errors?.rank}
            />

            {/* Accident Type */}
            <AccidentTypeField
              value={formData?.accidentType || ""}
              onChange={onChange}
              error={errors?.accidentType}
            />

            {/* Accident Reason */}
            <AccidentReasonField
              value={formData?.accidentReason || ""}
              onChange={onChange}
              error={errors?.accidentReason}
            />

            {/* Accident Cost */}
            <AccidentCostField
              value={formData?.accidentCost || ""}
              onChange={onChange}
              error={errors?.accidentCost}
            />

            {/* Re-use */}
            <AccidentReuseField
              value={formData?.reUse || ""}
              onChange={onChange}
              error={errors?.reUse}
            />

            {/* Etc */}
            <AccidentEtcField
              value={formData?.etc || ""}
              onChange={onChange}
              error={errors?.etc}
            />

            {/* Remarks - Full Width */}
            <div className="md:col-span-2">
              <AccidentRemarksField
                value={formData?.remarks || ""}
                onChange={onChange}
                error={errors?.remarks}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <AccidentActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}