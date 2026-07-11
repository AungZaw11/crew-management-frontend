// src/components/crew/forms/QualificationForm.jsx
import React from "react";
import { useLanguage } from "../"../../common/hooks/LanguageContext";

export default function QualificationForm({
  formData,
  onChange,
  onSave,
  onCancel,
  mode = "create",
}) {
  const { t } = useLanguage();

  const isEdit = mode === "edit";

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {isEdit
              ? t("edit_qualification") || "Edit Qualification"
              : t("new_qualification") || "New Qualification"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Certificate Name */}
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-medium text-[#315888]">
                {t("certificate_name") || "Certificate Name"}
              </label>
              <input
                name="certificateName"
                value={formData?.certificateName || ""}
                onChange={onChange}
                placeholder={t("enter_certificate_name") || "Certificate Name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Expiration */}
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-medium text-[#315888]">
                {t("expiration") || "Expiration"}
              </label>
              <input
                name="expiration"
                value={formData?.expiration || ""}
                onChange={onChange}
                placeholder={t("enter_expiration") || "Expiration"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Training Date */}
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-medium text-[#315888]">
                {t("training_date") || "Training Date"}
              </label>
              <input
                type="date"
                name="trainingDate"
                value={formData?.trainingDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Expire Date */}
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-medium text-[#315888]">
                {t("expire_date") || "Expire Date"}
              </label>
              <input
                type="date"
                name="expireDate"
                value={formData?.expireDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* License Number */}
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-medium text-[#315888]">
                {t("license_number") || "License Number"}
              </label>
              <input
                name="licenseNumber"
                value={formData?.licenseNumber || ""}
                onChange={onChange}
                placeholder={
                  t("enter_license_number") || "Please Fill License Number"
                }
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Remarks */}
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <label className="text-base font-medium text-[#315888]">
                {t("remarks") || "Remarks"}
              </label>
              <textarea
                name="remarks"
                value={formData?.remarks || ""}
                onChange={onChange}
                placeholder={t("enter_remarks") || "Fill Remarks"}
                rows={4}
                className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-5">
          <button
            onClick={onCancel}
            className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            onClick={onSave}
            className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
          >
            {isEdit ? t("update") || "Update" : t("save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
