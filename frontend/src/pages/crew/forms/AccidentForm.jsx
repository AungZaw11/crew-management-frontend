// src/pages/crew/forms/AccidentForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Calendar } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

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

export default function AccidentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    shipName: "",
    rank: "",
    accidentReason: "",
    reUse: "",
    remarks: "",
    accidentDate: "",
    accidentType: "",
    accidentCost: "",
    etc: "",
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
      console.log("Saving accident:", formData);
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

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* ===== SUBHEADER ဖယ်ရှားပြီး ===== */}
      
      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
            <h2 className="text-[17px] font-medium text-[#3C5065]">
              {t("add_accident") || "Add Accident"}
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              {/* Ship's Name - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("ship_name") || "Ship's Name"}
                </FieldLabel>
                <div className="relative">
                  <select
                    name="shipName"
                    value={formData.shipName}
                    onChange={handleChange}
                    className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                <FieldLabel>
                  {t("accident_date") || "Accident Date"}
                </FieldLabel>
                <div className="relative">
                  <input
                    type="date"
                    name="accidentDate"
                    value={formData.accidentDate}
                    onChange={handleChange}
                    placeholder="-"
                    className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-15 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  />
                </div>
              </div>

              {/* Rank - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("rank") || "Rank"}
                </FieldLabel>
                <div className="relative">
                  <select
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                <FieldLabel>
                  {t("accident_type") || "Accident Type"}
                </FieldLabel>
                <div className="relative">
                  <select
                    name="accidentType"
                    value={formData.accidentType}
                    onChange={handleChange}
                    className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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

              {/* Accident Reason - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("accident_reason") || "Accident Reason"}
                </FieldLabel>
                <div className="relative">
                  <select
                    name="accidentReason"
                    value={formData.accidentReason}
                    onChange={handleChange}
                    className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                <FieldLabel>
                  {t("accident_cost") || "Accident Cost"}
                </FieldLabel>
                <input
                  name="accidentCost"
                  value={formData.accidentCost}
                  onChange={handleChange}
                  placeholder="-"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Re-use */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel>
                  {t("re_use") || "Re-use"}
                </FieldLabel>
                <input
                  name="reUse"
                  value={formData.reUse}
                  onChange={handleChange}
                  placeholder="-"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Etc */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel>
                  {t("etc") || "Etc"}
                </FieldLabel>
                <input
                  name="etc"
                  value={formData.etc}
                  onChange={handleChange}
                  placeholder="-"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                  placeholder={t("write_remarks") || "Write remarks ..."}
                  rows={3}
                  className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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