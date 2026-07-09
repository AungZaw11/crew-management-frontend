// src/pages/crew/forms/ReplacementForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";

// ===== DEPLOYMENT DIVISION OPTIONS =====
const DEPLOYMENT_DIVISION_OPTIONS = [
  { value: "sign_on", label: "Sign On" },
  { value: "sign_off", label: "Sign Off" },
];

// ===== DEPLOYMENT CONTENT - SIGN ON =====
const SIGN_ON_CONTENT_OPTIONS = [
  { value: "probation", label: "Probation" },
  { value: "rejoining", label: "Re-Joining" },
  { value: "new_joining", label: "New Joining" },
  { value: "promotion", label: "Promotion" },
  { value: "paid_leave", label: "Paid Leave (Passenger Ship)" },
];

// ===== DEPLOYMENT CONTENT - SIGN OFF =====
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

// ===== RANK OPTIONS =====
const RANK_OPTIONS = [
  { value: "20", label: "Master" },
  { value: "19", label: "Chief Officer" },
  { value: "6", label: "2nd Officer" },
  { value: "18", label: "3rd Officer" },
  { value: "18", label: "Chief Engineer" },
  { value: "3", label: "1st Engineer" },
  { value: "5", label: "2nd Engineer" },
  { value: "8", label: "3rd Engineer" },
  { value: "53", label: "Electrical Engineer" },
  { value: "17", label: "Boatswain" },
  { value: "12", label: "Able seaman" },
  { value: "40", label: "Ordinary Seaman" },
  { value: "4", label: "No.1 Oiler" },
  { value: "23", label: "Oiler" },
  { value: "45", label: "Fitter" },
  { value: "48", label: "Deck Cadet" },
  { value: "49", label: "Engine Cadet" },
  { value: "50", label: "Radio Officer" },
  { value: "41", label: "Wiper" },
  { value: "56", label: "Electrical rating" },
  { value: "54", label: "Motor man" },
  { value: "21", label: "Chief Cook" },
  { value: "38", label: "Cook" },
  { value: "2", label: "Mess Boy" },
  { value: "11", label: "Apprentice Officer" },
  { value: "9", label: "Apprentice Engineer" },
  { value: "52", label: "SECRETARY" },
  { value: "57", label: "Senior Office manager" },
  { value: "51", label: "Office manager" },
  { value: "55", label: "Steward/Stewardess" },
  { value: "58", label: "HOTEL DIRECTOR" },
  { value: "59", label: "TEAM MANAGER" },
  { value: "60", label: "F&B, CABIN crew" },
  { value: "61", label: "SOUS CHEF" },
  { value: "62", label: "ASSISTANT MANAGER" },
  { value: "63", label: "HEAD CHEF" },
  { value: "64", label: "IT MANAGER" },
  { value: "65", label: "IT PHOTOGRAPHER" },
  { value: "66", label: "RECEPTIONIST" },
  { value: "67", label: "COMIS" },
  { value: "68", label: "PLUMBER" },
  { value: "69", label: "FRONT OFFICE MANAGER" },
  { value: "70", label: "Public Area" },
  { value: "71", label: "CRUISE STAFF" },
  { value: "72", label: "SECURITY OFFICER" },
  { value: "73", label: "SECURITY GUARD" },
  { value: "74", label: "DISH MASHER" },
  { value: "75", label: "LAUNDRY ATTENDENT" },
  { value: "76", label: "ASSIST. FNB MANAGER" },
  { value: "77", label: "ACTIVITY MANAGER" },
  { value: "78", label: "ASSIST. FRONT OFFICE MANAGER" },
  { value: "79", label: "ADMIN OFFICER" },
  { value: "80", label: "CABIN MANAGER" },
  { value: "81", label: "F&B MANAGER" },
  { value: "82", label: "ASSIST. FRONT OFFICE MANAGER" },
  { value: "83", label: "AERIALIST" },
  { value: "84", label: "BACKSTAGE TECHNICIAN" },
  { value: "85", label: "CRUISE DIRECTOR" },
  { value: "86", label: "DAMPER" },
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

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function ReplacementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    division: "",
    content: "",
    ship: "",
    rank: "",
    date: "",
    place: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving replacement:", formData);
      // Add your API call here
      navigate(`/crew/${id}`);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  const crewLabel = t("new_replacement") || "New Replacement";

  // ===== Check if Sign On or Sign Off =====
  const isSignOn = formData.division === "sign_on";
  const isSignOff = formData.division === "sign_off";

  // ===== Get Content Options based on Division =====
  const getContentOptions = () => {
    if (isSignOn) return SIGN_ON_CONTENT_OPTIONS;
    if (isSignOff) return SIGN_OFF_CONTENT_OPTIONS;
    return [];
  };

  const contentOptions = getContentOptions();

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
            <h2 className="text-[17px] font-medium text-[#3C5065]">
              {t("new_replacement") || "New Replacement"}
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              {/* Deployment Division */}
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
                    {DEPLOYMENT_DIVISION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
                </div>
              </div>

              {/* Deployment Content */}
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

              {/* Ship's Name */}
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

              {/* Rank */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("rank") || "Rank"}
                </FieldLabel>
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
                      <option key={rank.value} value={rank.value}>
                        {rank.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("date") || "Date"}
                </FieldLabel>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
              </div>

              {/* Place */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel>
                  {t("place") || "Place"}
                </FieldLabel>
                <input
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder={t("enter_place") || "Enter place"}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Remarks - Full Width */}
              <div className="flex flex-col gap-2.5 md:col-span-2">
                <FieldLabel>
                  {t("remarks") || "Remarks"}
                </FieldLabel>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder={t("enter_remarks") || "Enter remarks"}
                  rows={4}
                  className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-5">
            <button
              onClick={handleCancel}
              className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={handleSave}
              className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
            >
              {t("save") || "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}