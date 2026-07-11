// src/features/accident/components/AccidentForm.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== SHIP NAME OPTIONS =====
const SHIP_NAME_OPTIONS = [
  "ORIENTAL STAR",
  "FROM K",
  "HI CREST",
  "DDS MARINA",
  "CS CRYSTAL",
  "ORIENTAL ENTERPRISE",
  "EASTERN DREAM",
  "EASTERN VENUS",
  "ORIENTAL FRONTIER",
  "OCEAN LEADER",
  "OCEAN PRIDE 1",
  "SUN RIO",
  "SUN STAR",
  "WOORI SUN",
  "WOORI SKY",
  "HS GLORY",
];

// ===== RANK OPTIONS =====
const RANK_OPTIONS = [
  "Master",
  "Chief Officer",
  "2nd Officer",
  "3rd Officer",
  "Chief Engineer",
  "1st Engineer",
  "2nd Engineer",
  "3rd Engineer",
  "Electrical Engineer",
  "Boatswain",
  "Able Seaman",
  "Ordinary Seaman",
  "No.1 Oiler",
  "Oiler",
  "Fitter",
  "Deck Cadet",
  "Engine Cadet",
  "Radio Officer",
  "Wiper",
  "Motor Man",
  "Chief Cook",
  "Cook",
  "Mess Boy",
];

// ===== ACCIDENT TYPE OPTIONS =====
const ACCIDENT_TYPE_OPTIONS = [
  "Injury",
  "Illness",
  "Property Damage",
  "Environmental",
  "Security",
  "Other",
];

// ===== ACCIDENT REASON OPTIONS =====
const ACCIDENT_REASON_OPTIONS = [
  "Human Error",
  "Equipment Failure",
  "Weather",
  "Procedural",
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

export default function AccidentForm({
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
              ? t("edit_accident") || "Edit Accident"
              : t("add_accident") || "Add Accident"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Ship's Name */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("ship_name") || "Ship's Name"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="shipName"
                  value={formData?.shipName || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("choose_ship_name") || "Choose Ship Name"}
                  </option>
                  {SHIP_NAME_OPTIONS.map((ship) => (
                    <option key={ship} value={ship}>
                      {ship}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Accident Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("accident_date") || "Accident Date"}
              </FieldLabel>
              <input
                type="date"
                name="accidentDate"
                value={formData?.accidentDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Rank */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>{t("rank") || "Rank"}</FieldLabel>
              <div className="relative">
                <select
                  name="rank"
                  value={formData?.rank || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_position") || "Select Position"}
                  </option>
                  {RANK_OPTIONS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Accident Type */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("accident_type") || "Accident Type"}</FieldLabel>
              <div className="relative">
                <select
                  name="accidentType"
                  value={formData?.accidentType || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_accident_type") || "Select Accident Type..."}
                  </option>
                  {ACCIDENT_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Accident Reason */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("accident_reason") || "Accident Reason"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="accidentReason"
                  value={formData?.accidentReason || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("write_reason") || "Write reason ..."}
                  </option>
                  {ACCIDENT_REASON_OPTIONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Accident Cost */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("accident_cost") || "Accident Cost"}</FieldLabel>
              <input
                type="number"
                name="accidentCost"
                value={formData?.accidentCost || ""}
                onChange={onChange}
                placeholder="0"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Re-use */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("re_use") || "Re-use"}</FieldLabel>
              <input
                name="reUse"
                value={formData?.reUse || ""}
                onChange={onChange}
                placeholder="-"
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Etc */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("etc") || "Etc"}</FieldLabel>
              <input
                name="etc"
                value={formData?.etc || ""}
                onChange={onChange}
                placeholder="-"
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
                placeholder={t("write_remarks") || "Write remarks ..."}
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