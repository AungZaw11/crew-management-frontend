// src/pages/crew/CrewList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Download,
  Plus,
  ChevronDown,
  List,
  Calendar,
  CheckSquare,
  Users,
  Anchor,
  UserCheck,
  AlertCircle,
  Search,
} from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ActionMenu from "../../components/ui/ActionMenu";
import Pagination from "../../components/ui/Pagination";
import { useLanguage } from "../../context/LanguageContext";
import {
  fetchCrews,
  deleteCrew,
  setFilters,
  setPage,
  resetFilters,
} from "../../redux/slices/crewSlice";

export default function CrewList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  // ===== REDUX STATE =====
  const {
    crews,
    loading,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    filters,
    error,
  } = useSelector((state) => state.crew);

  // ===== LOCAL STATE =====
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedVessel, setSelectedVessel] = useState("");
  const [isActive, setIsActive] = useState(null);

  // ===== FETCH CREWS =====
  const loadCrews = () => {
    dispatch(fetchCrews({
      page: currentPage,
      size: pageSize,
      search: filters.search || searchTerm,
      rank: filters.rank || selectedRank,
      vesselId: filters.vesselId || selectedVessel,
      isActive: filters.isActive !== null ? filters.isActive : isActive,
    }));
  };

  useEffect(() => {
    loadCrews();
  }, [currentPage, pageSize, filters]);

  // ===== SEARCH HANDLER =====
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setFilters({ search: value }));
    dispatch(setPage(0));
  };

  // ===== FILTER HANDLERS =====
  const handleRankFilter = (rank) => {
    setSelectedRank(rank);
    dispatch(setFilters({ rank }));
    dispatch(setPage(0));
  };

  const handleVesselFilter = (vesselId) => {
    setSelectedVessel(vesselId);
    dispatch(setFilters({ vesselId }));
    dispatch(setPage(0));
  };

  const handleActiveFilter = (value) => {
    setIsActive(value);
    dispatch(setFilters({ isActive: value }));
    dispatch(setPage(0));
  };

  // ===== PAGE CHANGE =====
  const handlePageChange = (page) => {
    dispatch(setPage(page - 1));
  };

  // ===== DELETE CREW =====
  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete?")) {
      const result = await dispatch(deleteCrew(id));
      if (result.meta.requestStatus === "fulfilled") {
        loadCrews();
      }
    }
  };

  // ===== EXPORT TO EXCEL =====
  const handleExportToExcel = () => {
    const exportData = crews.map((member, index) => ({
      No: member.no || String(index + 1).padStart(2, "0"),
      "Boarding Vessel": member.vessel || "-",
      Rank: member.rank || "-",
      "Seaman Code": member.seamanCode || member.crewCode || "-",
      Name: member.name || "-",
      Validity: member.validity || "-",
      Division: member.division || "-",
      Type: member.type || "-",
      Remaining: member.remaining !== undefined ? member.remaining : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Crew List");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Crew_List_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">
          {t("crew_management")}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-text-main hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Download size={16} /> {t("export")}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
          >
            <Plus size={16} /> {t("add_crew")}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-text-light font-medium">
              {t("total_crews")}
            </p>
            <p className="text-3xl font-bold text-text-main mt-1">
              {totalItems || 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-lighter flex items-center justify-center">
            <Users size={24} className="text-brand" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-text-light font-medium">
              {t("on_board")}
            </p>
            <p className="text-3xl font-bold text-text-main mt-1">
              {crews.filter(c => c.status === "active").length || 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <Anchor size={24} className="text-accent-green" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-text-light font-medium">
              {t("active_crews")}
            </p>
            <p className="text-3xl font-bold text-text-main mt-1">
              {crews.filter(c => c.isActive !== false).length || 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <UserCheck size={24} className="text-brand-blue" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-text-light font-medium">
              {t("compliance_issues")}
            </p>
            <p className="text-3xl font-bold text-accent-red mt-1">
              {crews.filter(c => c.complianceIssues > 0).length || 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <AlertCircle size={24} className="text-accent-red" />
          </div>
        </div>
      </div>

      
      {/* Filter Bar & Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-brand transition-colors">
              <span className="text-sm text-text-main">{t("vessel_name")}</span>
              <ChevronDown size={14} className="text-text-light" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-brand transition-colors">
              <span className="text-sm text-text-main">{t("crew_class")}</span>
              <ChevronDown size={14} className="text-text-light" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-brand transition-colors">
              <span className="text-sm text-text-main">{t("rank")}</span>
              <ChevronDown size={14} className="text-text-light" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-brand transition-colors">
              <span className="text-sm text-text-main">{t("sign_on")}</span>
              <ChevronDown size={14} className="text-text-light" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-brand transition-colors">
              <span className="text-sm text-text-main">{t("name")}</span>
              <ChevronDown size={14} className="text-text-light" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-sm text-text-main">2026-03-07 - 2026-07-31</span>
              <Calendar size={14} className="text-text-light" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer hover:text-brand transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              <span className="text-sm text-text-main">
                {t("include_period_contract")}
              </span>
            </label>

            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg bg-brand-dark text-white">
                <List size={18} />
              </button>
              <button
                onClick={() => navigate("/crew/calendar")}
                className="p-2 rounded-lg border border-gray-300 text-text-main hover:bg-gray-50 transition-colors"
              >
                <Calendar size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-sm font-semibold text-text-main">
                <th className="px-4 py-3 whitespace-nowrap">
                  {t("no") || "No"}
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  {t("boarding_vessel") || "Boarding Vessel"}
                </th>
                <th className="px-4 py-3 whitespace-nowrap">{t("rank")}</th>
                <th className="px-4 py-3 whitespace-nowrap">
                  {t("seaman_code") || "Seaman Code"}
                </th>
                <th className="px-4 py-3 whitespace-nowrap">{t("name")}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t("validity")}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t("division")}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t("type")}</th>
                <th className="px-4 py-3 whitespace-nowrap">
                  {t("remaining")}
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {crews.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-text-light">
                    {t("no_data")}
                  </td>
                </tr>
              ) : (
                crews.map((member, i) => (
                  <tr
                    key={member.id || i}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-text-dark">
                      {member.no || String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-dark">
                      {member.vessel || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-dark">
                      {member.rank || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-text-dark">
                      {member.seamanCode || member.crewCode || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-text-dark">
                      {member.name || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-dark max-w-[120px] truncate">
                      {member.validity || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-dark">
                      {member.division || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-dark">
                      {member.type || member.rank || "-"}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm font-semibold ${
                        member.remaining < 0 || (member.remaining !== undefined && member.remaining < 0)
                          ? "text-accent-red"
                          : "text-text-dark"
                      }`}
                    >
                      {member.remaining !== undefined ? member.remaining : "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <ActionMenu 
                        crewId={member.id} 
                        onDelete={handleDelete}
                        onEdit={() => navigate(`/crew/${member.id}/edit`)}
                        onView={() => navigate(`/crew/${member.id}`)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-text-light">
            {t("showing") || "Showing"} {crews.length} {t("of") || "of"}{" "}
            {totalItems} {t("entries") || "entries"}
          </p>
          <Pagination
            currentPage={currentPage + 1}
            totalPages={totalPages || Math.ceil(totalItems / pageSize) || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}