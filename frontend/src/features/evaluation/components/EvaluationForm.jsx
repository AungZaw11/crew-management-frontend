// src/features/evaluation/components/EvaluationForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import EvaluationDateField from "./EvaluationDateField";
import EvaluationShippingField from "./EvaluationShippingField";
import EvaluationPerformanceField from "./EvaluationPerformanceField";
import EvaluationAttachmentsField from "./EvaluationAttachmentsField";
import EvaluationActions from "./EvaluationActions";

export default function EvaluationForm({
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
              ? t("edit_evaluation") || "Edit Evaluation"
              : t("new_evaluation") || "New Evaluation"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            
            {/* Date */}
            <EvaluationDateField
              value={formData?.date || ""}
              onChange={onChange}
              error={errors?.date}
            />

            {/* Shipping */}
            <EvaluationShippingField
              value={formData?.shipping || ""}
              onChange={onChange}
              error={errors?.shipping}
            />

            {/* Performance Evaluation */}
            <div className="md:col-span-1">
              <EvaluationPerformanceField
                value={formData?.performance || ""}
                onChange={onChange}
                error={errors?.performance}
              />
            </div>

            {/* Attachments */}
            <div className="md:col-span-1">
              <EvaluationAttachmentsField
                value={formData?.attachments || ""}
                onChange={onChange}
                error={errors?.attachments}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <EvaluationActions
          isEditing={isEditing}
          isLoading={isLoading}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}