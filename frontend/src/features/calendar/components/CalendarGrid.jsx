// src/features/calendar/components/CalendarGrid.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import EventCard from "./EventCard";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CalendarGrid({ calendarData, isLoading }) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-7 gap-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-2">
            {[...Array(28)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!calendarData || calendarData.length === 0) {
    return (
      <div className="p-6 text-center py-12">
        <p className="text-gray-400 text-sm">
          {t("no_calendar_data") || "No calendar data available"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-gray-500"
          >
            {t(day.toLowerCase()) || day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-1 border border-gray-100 rounded-md ${
              day.isToday ? "bg-blue-50 border-blue-200" : "bg-white"
            } ${day.isOtherMonth ? "bg-gray-50 opacity-50" : ""}`}
          >
            <div className="flex justify-between items-start">
              <span
                className={`text-sm font-medium px-1.5 py-0.5 rounded-full ${
                  day.isToday
                    ? "bg-blue-600 text-white"
                    : day.isOtherMonth
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {day.date}
              </span>
              {day.eventCount > 0 && (
                <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                  {day.eventCount}
                </span>
              )}
            </div>
            <div className="mt-1 space-y-0.5">
              {day.events?.slice(0, 2).map((event, idx) => (
                <EventCard key={idx} event={event} />
              ))}
              {day.events?.length > 2 && (
                <div className="text-xs text-gray-400 text-center">
                  +{day.events.length - 2} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}