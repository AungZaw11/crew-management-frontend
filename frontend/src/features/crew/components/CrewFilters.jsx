// src/features/crew/components/CrewFilters.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

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

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "on_leave", label: "On Leave" },
  { value: "inactive", label: "Inactive" },
  { value: "terminated", label: "Terminated" },
];

export default function CrewFilters({ filters, setFilters }) {
  const { t } = useLanguage();

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <select
        value={filters.vessel}
        onChange={(e) => handleChange("vessel", e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[140px]"
      >
        <option value="">{t("all_vessels") || "All Vessels"}</option>
        {VESSEL_OPTIONS.map((vessel) => (
          <option key={vessel} value={vessel}>{vessel}</option>
        ))}
      </select>

      <select
        value={filters.rank}
        onChange={(e) => handleChange("rank", e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[140px]"
      >
        <option value="">{t("all_ranks") || "All Ranks"}</option>
        {RANK_OPTIONS.map((rank) => (
          <option key={rank} value={rank}>{rank}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[140px]"
      >
        <option value="">{t("all_status") || "All Status"}</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status.value} value={status.value}>
            {t(status.label) || status.label}
          </option>
        ))}
      </select>
    </>
  );
}