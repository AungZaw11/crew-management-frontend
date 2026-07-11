// src/features/calendar/components/CalendarFilters.jsx
import React from "react";
import { ChevronDown, Calendar, CheckSquare, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const VESSEL_OPTIONS = [
  "Sun Rio",
  "Sun Star",
  "Woori Sun",
  "Woori Sky",
  "HS Glory",
  "Oriental Star",
];

const RANK_OPTIONS = [
  "Master",
  "Chief Officer",
  "2nd Officer",
  "3rd Officer",
  "Chief Engineer",
  "Engineer",
  "Able Seaman",
];

export default function CalendarFilters({
  selectedVessel,
  setSelectedVessel,
  selectedRank,
  setSelectedRank,
  dateRange,
  setDateRange,
  includeContract,
  setIncludeContract,
  viewMode,
  setViewMode,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Vessel Filter */}
        <div className="relative">
          <select
            value={selectedVessel}
            onChange={(e) => setSelectedVessel(e.target.value)}
            className="h-[38px] pl-3 pr-8 border border-gray-200 rounded-md bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t("all_vessels") || "All Vessels"}</option>
            {VESSEL_OPTIONS.map((vessel) => (
              <option key={vessel} value={vessel}>{vessel}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Rank Filter */}
        <div className="relative">
          <select
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
            className="h-[38px] pl-3 pr-8 border border-gray-200 rounded-md bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t("all_ranks") || "All Ranks"}</option>
            {RANK_OPTIONS.map((rank) => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Date Range */}
        <div className="relative">
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            placeholder={t("select_date_range") || "Select date range"}
            className="h-[38px] pl-3 pr-8 border border-gray-200 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
          />
          <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Include Contract */}
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <CheckSquare
            size={18}
            className={includeContract ? "text-blue-600" : "text-gray-400"}
            onClick={() => setIncludeContract(!includeContract)}
          />
          <span>{t("include_contract") || "Include Contract"}</span>
        </label>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-gray-200 rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title={t("list_view") || "List View"}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`p-2 transition-colors ${
              viewMode === "calendar"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title={t("calendar_view") || "Calendar View"}
          >
            <Calendar size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}