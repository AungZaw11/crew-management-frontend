// src/features/health/components/HealthForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== BLOOD TYPE OPTIONS =====
const BLOOD_OPTIONS = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "AB", label: "AB" },
  { value: "O", label: "O" },
];

// ===== DECISION OPTIONS =====
const DECISION_OPTIONS = [
  { value: "Normal", label: "Normal" },
  { value: "Abnormal", label: "Abnormal" },
  { value: "Fit", label: "Fit" },
  { value: "Unfit", label: "Unfit" },
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function HealthForm({
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
              ? t("edit_health") || "Edit Health Record"
              : t("add_health") || "Add Health Record"}
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

            {/* Weight */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("weight") || "Weight (kg)"}</FieldLabel>
              <input
                type="number"
                name="weight"
                value={formData?.weight || ""}
                onChange={onChange}
                placeholder={t("enter_weight") || "Enter weight in kg"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Size (H/W) - Combined */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("size") || "Size (H/W)"}</FieldLabel>
              <input
                name="size"
                value={formData?.size || ""}
                onChange={onChange}
                placeholder="170cm / 65kg"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Sight (L) */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("sight_left") || "Sight (Left)"}</FieldLabel>
              <input
                name="sightLeft"
                value={formData?.sightLeft || ""}
                onChange={onChange}
                placeholder="1.0"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Sight (R) */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("sight_right") || "Sight (Right)"}</FieldLabel>
              <input
                name="sightRight"
                value={formData?.sightRight || ""}
                onChange={onChange}
                placeholder="1.0"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Hearing (L) */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("hearing_left") || "Hearing (Left)"}</FieldLabel>
              <input
                name="hearingLeft"
                value={formData?.hearingLeft || ""}
                onChange={onChange}
                placeholder="Normal"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Hearing (R) */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("hearing_right") || "Hearing (Right)"}</FieldLabel>
              <input
                name="hearingRight"
                value={formData?.hearingRight || ""}
                onChange={onChange}
                placeholder="Normal"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Blood Type */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("blood") || "Blood Type"}</FieldLabel>
              <div className="relative">
                <select
                  name="blood"
                  value={formData?.blood || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_blood") || "Select Blood Type..."}
                  </option>
                  {BLOOD_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Decision */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("decision") || "Decision"}</FieldLabel>
              <div className="relative">
                <select
                  name="decision"
                  value={formData?.decision || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_decision") || "Select Decision..."}
                  </option>
                  {DECISION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Allergies */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("allergies") || "Allergies"}</FieldLabel>
              <input
                name="allergies"
                value={formData?.allergies || ""}
                onChange={onChange}
                placeholder={t("enter_allergies") || "Enter allergies (separate with comma)"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Vaccinations */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("vaccinations") || "Vaccinations"}</FieldLabel>
              <input
                name="vaccinations"
                value={formData?.vaccinations || ""}
                onChange={onChange}
                placeholder={t("enter_vaccinations") || "Enter vaccinations (separate with comma)"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Medical Notes - Full Width */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("medical_notes") || "Medical Notes"}</FieldLabel>
              <textarea
                name="medicalNotes"
                value={formData?.medicalNotes || ""}
                onChange={onChange}
                placeholder={t("enter_medical_notes") || "Enter medical notes"}
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