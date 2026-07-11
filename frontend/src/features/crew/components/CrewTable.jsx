// src/features/crew/components/CrewTable.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import CrewStatusBadge from "./CrewStatusBadge";

export default function CrewTable({ crews, isLoading, onDelete, onEdit, onView }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [sortField, setSortField] = useState("name_eng");
  const [sortDirection, setSortDirection] = useState("asc");

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!crews || crews.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">
            {t("no_crew_members") || "No crew members found"}
          </p>
        </div>
      </div>
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCrews = [...crews].sort((a, b) => {
    const aVal = a[sortField] || "";
    const bVal = b[sortField] || "";
    return sortDirection === "asc" 
      ? aVal.toString().localeCompare(bVal.toString())
      : bVal.toString().localeCompare(aVal.toString());
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 text-gray-300" />;
    return sortDirection === "asc" 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("crew_code")}
              >
                <div className="flex items-center gap-1">
                  {t("crew_code") || "Crew Code"}
                  <SortIcon field="crew_code" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("name_eng")}
              >
                <div className="flex items-center gap-1">
                  {t("name") || "Name"}
                  <SortIcon field="name_eng" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("rank")}
              >
                <div className="flex items-center gap-1">
                  {t("rank") || "Rank"}
                  <SortIcon field="rank" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("vessel")}
              >
                <div className="flex items-center gap-1">
                  {t("vessel") || "Vessel"}
                  <SortIcon field="vessel" />
                </div>
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
            {sortedCrews.map((crew) => (
              <tr 
                key={crew.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/crew/${crew.id}`)}
              >
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
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
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
                    onClick={() => onDelete(crew.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title={t("delete") || "Delete"}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
        <span>
          {t("showing") || "Showing"} {sortedCrews.length} {t("of") || "of"} {crews.length} {t("crew_members") || "crew members"}
        </span>
      </div>
    </div>
  );
}