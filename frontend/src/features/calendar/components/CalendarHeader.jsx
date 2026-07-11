// src/features/calendar/components/CalendarHeader.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function CalendarHeader({
  currentMonth,
  setCurrentMonth,
  onPrevMonth,
  onNextMonth,
  onToday,
}) {
  const { t } = useLanguage();

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-lg font-semibold text-gray-800 min-w-[150px] text-center">
          {currentMonth}
        </span>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <button
        onClick={onToday}
        className="px-4 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors font-medium"
      >
        {t("today") || "Today"}
      </button>
    </div>
  );
}