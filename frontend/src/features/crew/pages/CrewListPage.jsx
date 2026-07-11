// src/features/crew/pages/CrewListPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Download, Search, RefreshCw, Eye, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useCrewList } from "../hooks/useCrewList";
import CrewStatusBadge from "../components/CrewStatusBadge";

export default function CrewListPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ vessel: "", rank: "", status: "" });
  
  const { crews, isLoading, deleteCrew, refreshCrews } = useCrewList();

  // Filter crews
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

  const vesselOptions = ["Sun Rio", "Sun Star", "Woori Sun", "Woori Sky", "HS Glory"];
  const rankOptions = ["Master", "Chief Officer", "2nd Officer", "3rd Officer", "Chief Engineer", "Engineer", "Able Seaman"];
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "on_leave", label: "On Leave" },
    { value: "inactive", label: "Inactive" },
    { value: "terminated", label: "Terminated" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
        
        <select
          value={filters.vessel}
          onChange={(e) => setFilters({ ...filters, vessel: e.target.value })}
          className="px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[140px]"
        >
          <option value="">{t("all_vessels") || "All Vessels"}</option>
          {vesselOptions.map((vessel) => (
            <option key={vessel} value={vessel}>{vessel}</option>
          ))}
        </select>

        <select
          value={filters.rank}
          onChange={(e) => setFilters({ ...filters, rank: e.target.value })}
          className="px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[140px]"
        >
          <option value="">{t("all_ranks") || "All Ranks"}</option>
          {rankOptions.map((rank) => (
            <option key={rank} value={rank}>{rank}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[140px]"
        >
          <option value="">{t("all_status") || "All Status"}</option>
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {t(status.label) || status.label}
            </option>
          ))}
        </select>

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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("crew_code") || "Crew Code"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("rank") || "Rank"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("vessel") || "Vessel"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCrews?.length > 0 ? (
                filteredCrews.map((crew) => (
                  <tr key={crew.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {crew.crew_code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>
                        <div>{crew.name_eng || "-"}</div>
                        {crew.name_kor && (
                          <div className="text-xs text-gray-400">{crew.name_kor}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{crew.rank || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{crew.vessel || "-"}</td>
                    <td className="px-6 py-4">
                      <CrewStatusBadge status={crew.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/crew/${crew.id}`)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mr-1"
                        title={t("view_details") || "View Details"}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/crew/${crew.id}/edit`)}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors mr-1"
                        title={t("edit") || "Edit"}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteCrew(crew.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title={t("delete") || "Delete"}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    {t("no_crew_members") || "No crew members found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
          <span>
            {t("showing") || "Showing"} {filteredCrews?.length || 0} {t("of") || "of"} {crews?.length || 0} {t("crew_members") || "crew members"}
          </span>
        </div>
      </div>
    </div>
  );
}