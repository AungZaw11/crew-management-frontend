// src/features/family/components/FamilyForm.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== RELATION OPTIONS =====
const RELATION_OPTIONS = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Cousin",
  "Nephew",
  "Niece",
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

export default function FamilyForm({
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
              ? t("edit_family_member") || "Edit Family Member"
              : t("add_family_member") || "Add Family Member"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Name - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>{t("name") || "Name"}</FieldLabel>
              <input
                name="name"
                value={formData?.name || ""}
                onChange={onChange}
                placeholder={t("enter_name") || "Enter name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Relation - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("relation") || "Relation"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="relation"
                  value={formData?.relation || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_relation") || "Select Relation..."}
                  </option>
                  {RELATION_OPTIONS.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Birth */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("birth") || "Birth"}</FieldLabel>
              <input
                type="date"
                name="birth"
                value={formData?.birth || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("phone") || "Phone"}</FieldLabel>
              <input
                name="phone"
                value={formData?.phone || ""}
                onChange={onChange}
                placeholder={t("enter_phone") || "Enter phone number"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <FieldLabel>{t("address") || "Address"}</FieldLabel>
              <input
                name="address"
                value={formData?.address || ""}
                onChange={onChange}
                placeholder={t("enter_address") || "Enter address"}
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