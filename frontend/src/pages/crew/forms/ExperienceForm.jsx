// src/pages/crew/forms/ExperienceForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Plus, Trash2, Edit2, X } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

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

// ===== SHIP TYPE OPTIONS =====
const SHIP_TYPE_OPTIONS = [
  "Container Ship",
  "Bulk Carrier",
  "Tanker",
  "Passenger Ship",
  "Ro-Ro Ship",
  "Offshore Vessel",
  "Tugboat",
  "Fishing Vessel",
  "Cruise Ship",
  "LNG Carrier",
  "LPG Carrier",
  "Chemical Tanker",
  "Oil Tanker",
  "General Cargo",
  "Other",
];

// ===== AREA OPTIONS =====
const AREA_OPTIONS = [
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Australia",
  "Pacific",
  "Middle East",
  "Worldwide",
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

export default function ExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      companyName: "",
      shipName: "",
      rank: "",
      boardingDate: "",
      leavingDate: "",
      area: "",
      shipType: "",
      boardLeave: "",
      grt: "",
      kw: "",
      remarks: "",
    }
  ]);

  const handleChange = (e, expId) => {
    const { name, value } = e.target;
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === expId
          ? { ...exp, [name]: value }
          : exp
      )
    );
  };

  const handleDeleteExperience = (expId) => {
    if (experiences.length === 1) {
      alert(t("at_least_one_experience") || "You must have at least one experience record");
      return;
    }
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete this experience?")) {
      setExperiences(experiences.filter((exp) => exp.id !== expId));
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving experiences:", experiences);
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
              {t("experiences") || "Experiences"}
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            {/* Experience Cards - No Add Button */}
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="mb-6 rounded-lg border border-gray-200 bg-[#FBFDFF] p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#3C5065]">
                    {t("experience") || "Experience"} #{index + 1}
                  </h3>
                  {experiences.length > 1 && (
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Company Name */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel required={true}>
                      {t("company_name") || "Company Name"}
                    </FieldLabel>
                    <input
                      name="companyName"
                      value={exp.companyName}
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder={t("enter_company_name") || "Enter company name"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* Ship Name */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel required={true}>
                      {t("ship_name") || "Ship Name"}
                    </FieldLabel>
                    <input
                      name="shipName"
                      value={exp.shipName}
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder={t("enter_ship_name") || "Enter ship name"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* Rank */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel required={true}>
                      {t("rank") || "Rank"}
                    </FieldLabel>
                    <div className="relative">
                      <select
                        name="rank"
                        value={exp.rank}
                        onChange={(e) => handleChange(e, exp.id)}
                        className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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

                  {/* Boarding Date */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel required={true}>
                      {t("boarding_date") || "Boarding Date"}
                    </FieldLabel>
                    <input
                      type="date"
                      name="boardingDate"
                      value={exp.boardingDate}
                      onChange={(e) => handleChange(e, exp.id)}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* Leaving Date */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("leaving_date") || "Leaving Date"}
                    </FieldLabel>
                    <input
                      type="date"
                      name="leavingDate"
                      value={exp.leavingDate}
                      onChange={(e) => handleChange(e, exp.id)}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* Area */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("area") || "Area"}
                    </FieldLabel>
                    <select
                      name="area"
                      value={exp.area}
                      onChange={(e) => handleChange(e, exp.id)}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                  </div>

                  {/* Ship Type */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("ship_type") || "Ship Type"}
                    </FieldLabel>
                    <select
                      name="shipType"
                      value={exp.shipType}
                      onChange={(e) => handleChange(e, exp.id)}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
                  </div>

                  {/* Board/Leave */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("board_leave") || "Board/Leave"}
                    </FieldLabel>
                    <input
                      name="boardLeave"
                      value={exp.boardLeave}
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder={t("enter_board_leave") || "Enter board/leave"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* GRT */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("grt") || "GRT"}
                    </FieldLabel>
                    <input
                      name="grt"
                      value={exp.grt}
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder={t("enter_grt") || "Enter GRT"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* KW */}
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("kw") || "KW"}
                    </FieldLabel>
                    <input
                      name="kw"
                      value={exp.kw}
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder={t("enter_kw") || "Enter KW"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  {/* Remarks - Full Width */}
                  <div className="flex flex-col gap-1.5 md:col-span-3">
                    <FieldLabel>
                      {t("remarks") || "Remarks"}
                    </FieldLabel>
                    <textarea
                      name="remarks"
                      value={exp.remarks}
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder={t("enter_remarks") || "Enter remarks"}
                      rows={2}
                      className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>
                </div>
              </div>
            ))}
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