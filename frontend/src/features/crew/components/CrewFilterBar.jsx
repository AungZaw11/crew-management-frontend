// src/features/crew/components/CrewFilterBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar, List, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== OPTIONS =====
const VESSEL_OPTIONS = [
  "Sun Rio",
  "Sun Star",
  "Woori Sun",
  "Woori Sky",
  "HS Glory",
  "Oriental Star",
  "Oriental Enterprise",
  "Ocean Leader",
];

const CREW_CLASS_OPTIONS = ["Officer", "Engineer", "Rating", "Cadet"];

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
];

const SIGN_ON_OPTIONS = ["Sign On", "Sign Off"];

// ===== DATE RANGE PICKER COMPONENT =====
function DateRangePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pickerRef = useRef(null);

  // Parse existing value
  useEffect(() => {
    if (value && value.includes(" - ")) {
      const parts = value.split(" - ");
      if (parts.length === 2) {
        setStartDate(parts[0]);
        setEndDate(parts[1]);
      }
    }
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    if (startDate && endDate) {
      onChange(`${startDate} - ${endDate}`);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    onChange("");
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (value) return value;
    return "Select Date Range";
  };

  return (
    <div className="relative" ref={pickerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2 cursor-pointer transition-colors ${
          isOpen ? "border-brand ring-2 ring-brand/20" : "border-gray-200 hover:border-brand"
        }`}
      >
        <span className={`text-sm ${value ? "text-text-main font-medium" : "text-text-light"}`}>
          {getDisplayText()}
        </span>
        {value ? (
          <X
            size={14}
            className="text-text-light hover:text-accent-red cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          />
        ) : (
          <Calendar size={14} className="text-text-light" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-72">
          <div className="space-y-3">
            {/* Start Date */}
            <div>
              <label className="text-xs font-medium text-text-light block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-xs font-medium text-text-light block mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={handleClear}
                className="flex-1 px-3 py-1.5 text-sm text-text-light hover:text-accent-red hover:bg-red-50 rounded-md transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                disabled={!startDate || !endDate}
                className={`flex-1 px-3 py-1.5 text-sm text-white rounded-md transition-colors ${
                  startDate && endDate
                    ? "bg-brand-dark hover:bg-brand"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function CrewFilterBar({ filters, setFilters, onCalendarClick }) {
  const { t } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

  const clearFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const renderDropdown = (key, options, label, value) => {
    const isOpen = openDropdown === key;
    const hasValue = value && value !== "";

    return (
      <div className="relative">
        <div
          onClick={() => toggleDropdown(key)}
          className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2 cursor-pointer transition-colors ${
            isOpen ? "border-brand ring-2 ring-brand/20" : "border-gray-200 hover:border-brand"
          }`}
        >
          <span className={`text-sm ${hasValue ? "text-text-main font-medium" : "text-text-light"}`}>
            {hasValue ? value : label}
          </span>
          {hasValue ? (
            <X
              size={14}
              className="text-text-light hover:text-accent-red cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                clearFilter(key);
              }}
            />
          ) : (
            <ChevronDown size={14} className="text-text-light" />
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            <div className="p-1">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleFilterChange(key, option)}
                  className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                    value === option
                      ? "bg-brand text-white"
                      : "hover:bg-gray-100 text-text-main"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
      <div className="flex flex-wrap items-center gap-3">
        {/* Vessel Filter */}
        {renderDropdown(
          "vessel",
          VESSEL_OPTIONS,
          t("vessel_name") || "Vessel's Name",
          filters.vessel
        )}

        {/* Crew Class Filter */}
        {renderDropdown(
          "crewClass",
          CREW_CLASS_OPTIONS,
          t("crew_class") || "Crew Class",
          filters.crewClass
        )}

        {/* Rank Filter */}
        {renderDropdown(
          "rank",
          RANK_OPTIONS,
          t("rank") || "Rank",
          filters.rank
        )}

        {/* Sign On Filter */}
        {renderDropdown(
          "signOn",
          SIGN_ON_OPTIONS,
          t("sign_on") || "Sign On",
          filters.signOn
        )}

        {/* Name Filter - Text Input */}
        <div className="relative">
          <input
            type="text"
            value={filters.name || ""}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            placeholder={t("name") || "Name"}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 w-32"
          />
          {filters.name && (
            <X
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-accent-red cursor-pointer"
              onClick={() => clearFilter("name")}
            />
          )}
        </div>

        {/* Date Range Picker */}
        <DateRangePicker
          value={filters.dateRange}
          onChange={(value) => handleFilterChange("dateRange", value)}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Include Period Contract */}
        <label className="flex items-center gap-2 cursor-pointer hover:text-brand transition-colors">
          <input
            type="checkbox"
            checked={filters.includeContract || false}
            onChange={(e) => handleFilterChange("includeContract", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
          />
          <span className="text-sm text-text-main whitespace-nowrap">
            {t("include_period_contract") || "Include Period Contract"}
          </span>
        </label>

        {/* View Toggle */}
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg bg-brand-dark text-white">
            <List size={18} />
          </button>
          <button
            onClick={onCalendarClick}
            className="p-2 rounded-lg border border-gray-300 text-text-main hover:bg-gray-50 transition-colors"
          >
            <Calendar size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}