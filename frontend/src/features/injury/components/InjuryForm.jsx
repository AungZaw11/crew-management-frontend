// src/features/injury/components/InjuryForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== OPTIONS =====
const TYPE_OPTIONS = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
];

const INJURY_TYPE_OPTIONS = [
  "Fracture",
  "Burn",
  "Cut",
  "Sprain",
  "Concussion",
  "Amputation",
  "Other",
];

const BODY_PART_OPTIONS = [
  "Head",
  "Neck",
  "Shoulder",
  "Arm",
  "Elbow",
  "Wrist",
  "Hand",
  "Finger",
  "Chest",
  "Back",
  "Abdomen",
  "Hip",
  "Leg",
  "Knee",
  "Ankle",
  "Foot",
  "Toe",
  "Other",
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function InjuryForm({
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
              ? t("edit_injury") || "Edit Injury"
              : t("add_injury") || "Add Injury"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Injury Type */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("injury_type") || "Injury Type"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="injuryType"
                  value={formData?.injuryType || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_injury_type") || "Select Injury Type..."}
                  </option>
                  {INJURY_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Body Part */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("body_part") || "Body Part"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="bodyPart"
                  value={formData?.bodyPart || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_body_part") || "Select Body Part..."}
                  </option>
                  {BODY_PART_OPTIONS.map((part) => (
                    <option key={part} value={part}>
                      {part}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Injury Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("injury_date") || "Injury Date"}
              </FieldLabel>
              <input
                type="date"
                name="injuryDate"
                value={formData?.injuryDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Treatment Start Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>
                {t("treatment_start_date") || "Treatment Start Date"}
              </FieldLabel>
              <input
                type="date"
                name="startDate"
                value={formData?.startDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Recovery Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("recovery_date") || "Recovery Date"}</FieldLabel>
              <input
                type="date"
                name="recoveryDate"
                value={formData?.recoveryDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Public/Private */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("public_private") || "Public/Private"}</FieldLabel>
              <div className="relative">
                <select
                  name="type"
                  value={formData?.type || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_type") || "Select Type..."}
                  </option>
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hospital */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("hospital") || "Hospital"}</FieldLabel>
              <input
                name="hospital"
                value={formData?.hospital || ""}
                onChange={onChange}
                placeholder={t("enter_hospital") || "Enter hospital name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Medical Name */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("medical_name") || "Medical Name"}</FieldLabel>
              <input
                name="medicalName"
                value={formData?.medicalName || ""}
                onChange={onChange}
                placeholder={t("enter_medical_name") || "Enter medical name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Illness */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("illness") || "Illness"}</FieldLabel>
              <input
                name="illness"
                value={formData?.illness || ""}
                onChange={onChange}
                placeholder={t("enter_illness") || "Enter illness"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Expense - Won */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("expense_won") || "Expense (KRW)"}</FieldLabel>
              <input
                type="number"
                name="expenseWon"
                value={formData?.expenseWon || ""}
                onChange={onChange}
                placeholder={t("enter_expense_won") || "Enter expense in KRW"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Expense - Foreign */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("expense_ex") || "Expense (Foreign)"}</FieldLabel>
              <input
                type="number"
                name="expenseEx"
                value={formData?.expenseEx || ""}
                onChange={onChange}
                placeholder={t("enter_expense_ex") || "Enter expense in foreign currency"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Remarks - Full Width */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("remarks") || "Remarks"}</FieldLabel>
              <textarea
                name="remarks"
                value={formData?.remarks || ""}
                onChange={onChange}
                placeholder={t("enter_remarks") || "Enter remarks"}
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