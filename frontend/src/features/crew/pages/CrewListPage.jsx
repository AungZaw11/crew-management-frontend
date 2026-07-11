// src/features/crew/pages/CrewListPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useCrewList } from "../hooks/useCrewList";
import CrewStatsCards from "../components/CrewStatsCards";
import CrewFilterBar from "../components/CrewFilterBar";
import CrewTable from "../components/CrewTable";
import CrewPagination from "../components/CrewPagination";

export default function CrewListPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState({
    vessel: "",
    crewClass: "",
    rank: "",
    signOn: "",
    name: "",
    dateRange: "2026-03-07 - 2026-07-31",
    includeContract: false,
  });

  const { crews, totalItems, loading, deleteCrew, exportToExcel } = useCrewList({
    page: currentPage,
    size: pageSize,
    filters,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      await deleteCrew(id);
    }
  };

  const handleExportToExcel = () => {
    exportToExcel();
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">
          {t("crew_management") || "Crew Management"}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-text-main hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Download size={16} /> {t("export") || "Export"}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
          >
            <Plus size={16} /> {t("add_crew") || "Add Crew"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <CrewStatsCards crews={crews} loading={loading} />

      {/* Filter Bar & Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <CrewFilterBar
          filters={filters}
          setFilters={setFilters}
          onCalendarClick={() => navigate("/crew/calendar")}
        />

        {/* Table */}
        <CrewTable
          crews={crews}
          loading={loading}
          onDelete={handleDelete}
          onEdit={(id) => navigate(`/crew/${id}/edit`)}
          onView={(id) => navigate(`/crew/${id}`)}
        />

        {/* Pagination */}
        <CrewPagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}