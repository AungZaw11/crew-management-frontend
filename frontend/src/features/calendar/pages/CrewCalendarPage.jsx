// src/features/calendar/pages/CrewCalendarPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Download } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useCalendar } from "../hooks/useCalendar";
import CalendarFilters from "../components/CalendarFilters";
import CalendarHeader from "../components/CalendarHeader";
import CalendarGrid from "../components/CalendarGrid";
import CalendarLegend from "../components/CalendarLegend";
import SummaryCard from "../../../common/components/SummaryCard";

const mockSummary = [
  { title: "Certificate", total: 72, expire: 24, days: 30 },
  { title: "Contract", total: 72, expire: 24, days: 30 },
  { title: "PPT", total: 72, expire: 24, days: 30 },
  { title: "Payout", total: 72, expire: 24, days: 30 },
];

export default function CrewCalendarPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const {
    currentMonth,
    setCurrentMonth,
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
    calendarData,
    isLoading,
    handlePrevMonth,
    handleNextMonth,
    goToToday,
  } = useCalendar();

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("crew_calendar") || "Crew Calendar"}
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            <Download size={16} /> {t("export") || "Export"}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} /> {t("add_crew") || "Add Crew"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockSummary.map((stat, i) => (
          <SummaryCard key={i} data={stat} />
        ))}
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Filters */}
        <CalendarFilters
          selectedVessel={selectedVessel}
          setSelectedVessel={setSelectedVessel}
          selectedRank={selectedRank}
          setSelectedRank={setSelectedRank}
          dateRange={dateRange}
          setDateRange={setDateRange}
          includeContract={includeContract}
          setIncludeContract={setIncludeContract}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Calendar Header */}
        <CalendarHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={goToToday}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          calendarData={calendarData}
          isLoading={isLoading}
        />

        {/* Legend */}
        <CalendarLegend />
      </div>
    </div>
  );
}