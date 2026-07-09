// src/components/crew/forms/ReplacementForm.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

// ===== DIVISION OPTIONS =====
const DIVISION_OPTIONS = [
  "Deck",
  "Engine",
  "Catering",
  "Hotel",
  "Medical",
  "Technical",
  "Other",
];

// ===== CONTENT OPTIONS =====
const CONTENT_OPTIONS = [
  "Emergency Replacement",
  "Scheduled Rotation",
  "Medical Leave",
  "Resignation",
  "Promotion",
  "Transfer",
  "Contract End",
  "Other",
];

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

// ===== PLACE OPTIONS =====
const PLACE_OPTIONS = [
  "Yangon",
  "Singapore",
  "Busan",
  "Tokyo",
  "Shanghai",
  "Dubai",
  "Rotterdam",
  "Houston",
  "Sydney",
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

export default function ReplacementForm({
  formData,
  onChange,
  onSave,
  onCancel,
  mode = "create",
  crewId,
}) {
  const { t } = useLanguage();
  const isEdit = mode === "edit";

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {isEdit
              ? t("edit_replacement") || "Edit Replacement"
              : t("new_replacement") || "New Replacement"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Deployment Division - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("deployment_division") || "Deployment Division"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="division"
                  value={formData?.division || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_division") || "Select Division..."}
                  </option>
                  {DIVISION_OPTIONS.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Deployment Content - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("deployment_content") || "Deployment Content"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="content"
                  value={formData?.content || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_deployment_content") ||
                      "Select Deployment Content..."}
                  </option>
                  {CONTENT_OPTIONS.map((content) => (
                    <option key={content} value={content}>
                      {content}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Ship Name - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("ship_name") || "Ship's Name"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="ship"
                  value={formData?.ship || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_ship") || "Select Ship..."}
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

            {/* Rank - Required */}
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

            {/* Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("date") || "Date"}</FieldLabel>
              <input
                type="date"
                name="date"
                value={formData?.date || ""}
                onChange={onChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Place */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("place") || "Place"}</FieldLabel>
              <div className="relative">
                <select
                  name="place"
                  value={formData?.place || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                >
                  <option value="">
                    {t("select_place") || "Select Place..."}
                  </option>
                  {PLACE_OPTIONS.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
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
