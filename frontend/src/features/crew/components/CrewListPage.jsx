// src/features/crew/pages/CrewListPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Download, Search, RefreshCw } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useCrewList } from "../hooks/useCrewList";
import CrewTable from "./CrewTable";
import CrewFilters from "./CrewFilters";

export default function CrewListPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ vessel: "", rank: "", status: "" });

  const { crews, isLoading, deleteCrew, refreshCrews } = useCrewList();

  const filteredCrews = crews?.filter((crew) => {
    const matchesSearch =
      crew.name_eng?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crew.name_kor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crew.crew_code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVessel = filters.vessel ? crew.vessel === filters.vessel : true;
    const matchesRank = filters.rank ? crew.rank === filters.rank : true;
    const matchesStatus = filters.status ? crew.status === filters.status : true;
    
    return matchesSearch && matchesVessel && matchesRank && matchesStatus;
  });

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t("crew_management") || "Crew Management"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {t("total_crews") || "Total Crews"}: {filteredCrews?.length || 0}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={refreshCrews}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            <RefreshCw size={16} />
            {t("refresh") || "Refresh"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            <Download size={16} />
            {t("export") || "Export"}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            {t("add_crew") || "Add Crew"}
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={t("search_placeholder") || "Search by name, code, vessel..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <CrewFilters filters={filters} setFilters={setFilters} />
        {(searchTerm || filters.vessel || filters.rank || filters.status) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFilters({ vessel: "", rank: "", status: "" });
            }}
            className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {t("clear_filters") || "Clear Filters"}
          </button>
        )}
      </div>

      {/* Crew Table */}
      <CrewTable
        crews={filteredCrews || []}
        isLoading={isLoading}
        onDelete={deleteCrew}
      />
    </div>
  );
}