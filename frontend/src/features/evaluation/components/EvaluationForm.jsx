// src/features/evaluation/components/EvaluationForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== RATING OPTIONS =====
const RATING_OPTIONS = [
  { value: "1", label: "1 - Poor" },
  { value: "2", label: "2 - Below Average" },
  { value: "3", label: "3 - Average" },
  { value: "4", label: "4 - Good" },
  { value: "5", label: "5 - Excellent" },
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function EvaluationForm({
  formData,
  onChange,
  onSave,
  onCancel,
  mode = "create",
  isLoading = false,
}) {
  const { t } = useLanguage();
  const isEdit = mode === "edit";

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {isEdit
              ? t("edit_evaluation") || "Edit Evaluation"
              : t("new_evaluation") || "New Evaluation"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("date") || "Date"}
              </FieldLabel>
              <input
                type="date"
                name="date"
                value={formData?.date || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Height */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("height") || "Height (cm)"}</FieldLabel>
              <input
                type="number"
                name="height"
                value={formData?.height || ""}
                onChange={onChange}
                placeholder={t("enter_height") || "Enter height in cm"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Evaluator */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("evaluator") || "Evaluator Name"}
              </FieldLabel>
              <input
                name="evaluator"
                value={formData?.evaluator || ""}
                onChange={onChange}
                placeholder={t("enter_evaluator") || "Enter evaluator name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Period */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("evaluation_period") || "Evaluation Period"}
              </FieldLabel>
              <input
                name="period"
                value={formData?.period || ""}
                onChange={onChange}
                placeholder={t("enter_period") || "e.g., 2024-01 - 2024-12"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Overall Rating */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("overall_rating") || "Overall Rating (1-5)"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="overallRating"
                  value={formData?.overallRating || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_rating") || "Select Rating..."}
                  </option>
                  {RATING_OPTIONS.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Technical Rating */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("technical_rating") || "Technical Skills Rating (1-5)"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="technicalRating"
                  value={formData?.technicalRating || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_rating") || "Select Rating..."}
                  </option>
                  {RATING_OPTIONS.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Teamwork Rating */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("teamwork_rating") || "Teamwork Rating (1-5)"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="teamworkRating"
                  value={formData?.teamworkRating || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_rating") || "Select Rating..."}
                  </option>
                  {RATING_OPTIONS.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Shipping */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("shipping") || "Shipping"}</FieldLabel>
              <input
                name="shipping"
                value={formData?.shipping || ""}
                onChange={onChange}
                placeholder={t("enter_shipping") || "Enter shipping details"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Recommendation - Full Width */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("recommendation") || "Recommendation"}</FieldLabel>
              <textarea
                name="recommendation"
                value={formData?.recommendation || ""}
                onChange={onChange}
                placeholder={t("enter_recommendation") || "Enter recommendation"}
                rows={3}
                className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Performance Evaluation - Full Width */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel required={true}>
                {t("performance_evaluation") || "Performance Evaluation"}
              </FieldLabel>
              <textarea
                name="performance"
                value={formData?.performance || ""}
                onChange={onChange}
                placeholder={t("enter_performance_evaluation") || "Enter performance evaluation..."}
                rows={4}
                className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Comments - Full Width */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("comments") || "Comments"}</FieldLabel>
              <textarea
                name="comments"
                value={formData?.comments || ""}
                onChange={onChange}
                placeholder={t("enter_comments") || "Enter additional comments"}
                rows={3}
                className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end gap-5">
          <button
            onClick={onCancel}
            className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
            disabled={isLoading}
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            onClick={onSave}
            className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEdit ? t("update") || "Update" : t("save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}