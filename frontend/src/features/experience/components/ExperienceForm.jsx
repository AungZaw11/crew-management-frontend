// src/features/experience/components/ExperienceForm.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

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

// ===== AREA OPTIONS =====
const AREA_OPTIONS = [
  "South East Asia",
  "North East Asia",
  "Middle East",
  "Europe",
  "Africa",
  "Americas",
  "Oceania",
  "Worldwide",
];

// ===== SHIP TYPE OPTIONS =====
const SHIP_TYPE_OPTIONS = [
  "Bulk Carrier",
  "Container Ship",
  "Tanker",
  "Passenger Ship",
  "Ro-Ro Ship",
  "LNG Carrier",
  "Offshore Vessel",
  "Fishing Vessel",
  "Tugboat",
  "Others",
];

// ===== BOARD/LEAVE OPTIONS =====
const BOARD_LEAVE_OPTIONS = ["Board", "Leave"];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function ExperienceForm({
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
              ? t("edit_experience") || "Edit Experience"
              : t("new_experience") || "New Experience"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Company */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("company_name") || "Company Name"}
              </FieldLabel>
              <input
                name="company"
                value={formData?.company || ""}
                onChange={onChange}
                placeholder={t("enter_company_name") || "Enter company name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Ship Name */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("ship_name") || "Ship Name"}
              </FieldLabel>
              <input
                name="ship"
                value={formData?.ship || ""}
                onChange={onChange}
                placeholder={t("enter_ship_name") || "Enter ship name"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                    {t("select_rank") || "Select Rank..."}
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

            {/* Board/Leave */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("board_leave") || "Board/Leave"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="boardLeave"
                  value={formData?.boardLeave || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_board_leave") || "Select Board/Leave..."}
                  </option>
                  {BOARD_LEAVE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Boarding Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("boarding_date") || "Boarding Date"}
              </FieldLabel>
              <input
                type="date"
                name="boardingDate"
                value={formData?.boardingDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Leaving Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("leaving_date") || "Leaving Date"}
              </FieldLabel>
              <input
                type="date"
                name="leavingDate"
                value={formData?.leavingDate || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

            {/* Area */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("area") || "Area"}</FieldLabel>
              <div className="relative">
                <select
                  name="area"
                  value={formData?.area || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_area") || "Select Area..."}
                  </option>
                  {AREA_OPTIONS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Ship Type */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("ship_type") || "Ship Type"}</FieldLabel>
              <div className="relative">
                <select
                  name="shipType"
                  value={formData?.shipType || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_ship_type") || "Select Ship Type..."}
                  </option>
                  {SHIP_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* GRT */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("grt") || "GRT (Gross Tonnage)"}</FieldLabel>
              <input
                type="number"
                name="grt"
                value={formData?.grt || ""}
                onChange={onChange}
                placeholder={t("enter_grt") || "Enter GRT"}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* KW */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("kw") || "KW (Power)"}</FieldLabel>
              <input
                type="number"
                name="kw"
                value={formData?.kw || ""}
                onChange={onChange}
                placeholder={t("enter_kw") || "Enter KW"}
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