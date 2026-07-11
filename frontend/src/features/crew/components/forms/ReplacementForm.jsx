// src/components/crew/forms/ReplacementForm.jsx
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../"../../common/hooks/LanguageContext";

// ===== DIVISION OPTIONS =====
const DIVISION_OPTIONS = [
  { value: "sign_on", label: "Sign On" },
  { value: "sign_off", label: "Sign Off" },
];

// ===== CONTENT OPTIONS - SIGN ON =====
const SIGN_ON_CONTENT_OPTIONS = [
  { value: "probation", label: "Probation" },
  { value: "rejoining", label: "Re-Joining" },
  { value: "new_joining", label: "New Joining" },
  { value: "promotion", label: "Promotion" },
  { value: "paid_leave", label: "Paid Leave (Passenger Ship)" },
];

// ===== CONTENT OPTIONS - SIGN OFF =====
const SIGN_OFF_CONTENT_OPTIONS = [
  { value: "transfer", label: "Transfer" },
  { value: "etc", label: "ETC" },
  { value: "dismissal", label: "Dismissal" },
  { value: "vacation", label: "Vacation" },
  { value: "disciplinary", label: "Disciplinary" },
  { value: "promotion_off", label: "Promotion" },
  { value: "injury_illness", label: "Injure or Illness" },
  { value: "short_contract", label: "Short Contract" },
  { value: "self_will", label: "Self-Will" },
  { value: "without_notice", label: "Without Notice" },
  { value: "finished_contract", label: "Finished Contract" },
  { value: "end_paid_leave", label: "End of paid Leave(Passenger ships)" },
  { value: "sold", label: "SOLD" },
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
  initialData = {},
  onSave,
  onCancel,
  mode = "create",
  crewId,
}) {
  const { t } = useLanguage();
  const isEdit = mode === "edit";

  // ===== INTERNAL STATE =====
  const [formData, setFormData] = useState({
    division: "",
    content: "",
    ship: "",
    rank: "",
    date: "",
    place: "",
    remarks: "",
  });

  // ===== LOAD INITIAL DATA =====
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        division: initialData.division || "",
        content: initialData.content || "",
        ship: initialData.ship || "",
        rank: initialData.rank || "",
        date: initialData.date || "",
        place: initialData.place || "",
        remarks: initialData.remarks || "",
      });
    }
  }, [initialData]);

  // ===== HANDLE CHANGE =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== CHECK DIVISION =====
  const isSignOn = formData.division === "sign_on";
  const isSignOff = formData.division === "sign_off";

  // ===== GET CONTENT OPTIONS =====
  const getContentOptions = () => {
    if (isSignOn) return SIGN_ON_CONTENT_OPTIONS;
    if (isSignOff) return SIGN_OFF_CONTENT_OPTIONS;
    return [];
  };

  const contentOptions = getContentOptions();

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
                  value={formData.division}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_division") || "Select Division..."}
                  </option>
                  {DIVISION_OPTIONS.map((division) => (
                    <option key={division.value} value={division.value}>
                      {division.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Deployment Content - Required - Conditional */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("deployment_content") || "Deployment Content"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                  disabled={!formData.division}
                >
                  <option value="">
                    {!formData.division
                      ? t("select_division_first") || "Please select Division first..."
                      : t("select_deployment_content") || "Select Deployment Content..."
                    }
                  </option>
                  {contentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
              {!formData.division && (
                <p className="text-xs text-amber-600">
                  {t("select_division_first") || "Please select Division first"}
                </p>
              )}
            </div>

            {/* Ship Name - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("ship_name") || "Ship's Name"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="ship"
                  value={formData.ship}
                  onChange={handleChange}
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
                  value={formData.rank}
                  onChange={handleChange}
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
                value={formData.date}
                onChange={handleChange}
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
              />
            </div>

            {/* Place */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>{t("place") || "Place"}</FieldLabel>
              <div className="relative">
                <select
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
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
                value={formData.remarks}
                onChange={handleChange}
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
            onClick={() => onSave(formData)}
            className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
          >
            {isEdit ? t("update") || "Update" : t("save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
