// src/features/qualification/components/QualificationFilterBar.jsx
import React from "react";
import { Search, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Expired", label: "Expired" },
  { value: "Pending", label: "Pending" },
];

export default function QualificationFilterBar({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) {
  const { t } = useLanguage();

  const handleClear = () => {
    setSearchTerm("");
    setFilterStatus("all");
  };

  const hasFilters = searchTerm || filterStatus !== "all";

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      {/* Search */}
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={t("search_qualifications") || "Search qualifications..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Status Filter */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[130px]"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label) || option.label}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      {hasFilters && (
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
        >
          {t("clear_filters") || "Clear Filters"}
        </button>
      )}
    </div>
  );
}