import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
} from "lucide-react";
import DonutCard from "../../components/ui/DonutCard";

import { useLanguage } from '../../context/LanguageContext';

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('dashboard')}</h1>
      <p>Current language: {language}</p>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('kr')}>한국어</button>
    </div>
  );
}

const CERT_DATA = [
  { label: "Expire", value: 46, color: "#FE0001" },
  { label: "30 Days", value: 98, color: "#FFB44F" },
  { label: "60 Days", value: 118, color: "#10B981" },
  { label: "90 Days", value: 131, color: "#4F81BD" },
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DATES = [
  ["07", "08", "09", "10", "11", "12", "13"],
  ["14", "15", "16", "17", "18", "19", "20"],
  ["21", "22", "23", "24", "25", "26", "27"],
  ["28", "29", "30", "31", "01", "02", "03"],
];

const EVENTS = {
  "07": [
    { name: "Aung Ko Htet", type: "disembark" },
    { name: "Mg Mg Lwin", type: "disembark" },
    { name: "Htoo Htoo", type: "disembark" },
  ],
  23: [
    { name: "Ye Phyo Win", type: "embark" },
    { name: "Kyaw Zin", type: "embark" },
  ],
};

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = React.useState("March 2026");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-text tracking-wide">
          Calendar
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-[6px] bg-surface text-sm text-text hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-accent rounded-[6px] text-sm text-white hover:bg-brand-navy">
            <CalendarIcon className="w-4 h-4" />
            Export Calendar
          </button>
        </div>
      </div>

      {/* Donut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DonutCard
          title="Certificate"
          total={393}
          data={CERT_DATA}
          delay={0.1}
        />
        <DonutCard title="PPT" total={393} data={CERT_DATA} delay={0.2} />
        <DonutCard title="Contract" total={393} data={CERT_DATA} delay={0.3} />
      </div>

      {/* Calendar */}
      <div className="bg-surface border border-border rounded-[6px] shadow-card overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <ChevronLeft className="w-5 h-5 text-text" />
            </button>
            <span className="text-lg font-semibold text-text">
              {currentMonth}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <ChevronRight className="w-5 h-5 text-text" />
            </button>
          </div>
          <button className="text-sm text-brand-blue hover:underline">
            Today
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-border bg-brand-light/64">
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-medium text-[#202020] tracking-wide border-r border-border last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 grid-rows-4 min-h-[500px]">
          {DATES.map((week, weekIdx) =>
            week.map((date, dayIdx) => {
              const events = EVENTS[date] || [];
              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className="relative p-2 flex flex-col items-center border-r border-b border-[#F5F6F7] last:border-r-0 min-h-[120px]"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm text-text ${
                      date === "23" ? "bg-brand-blue text-white" : ""
                    }`}
                  >
                    {date}
                  </div>
                  <div className="w-full mt-2 flex flex-col gap-1">
                    {events.map((event, idx) => (
                      <div
                        key={idx}
                        className={`w-full py-1 px-2 rounded-[12px] text-center text-[10px] font-medium truncate ${
                          event.type === "disembark"
                            ? "bg-brand-blue text-brand-accent border border-border"
                            : "bg-status-green text-[#202020] border border-[#C2EECC]"
                        }`}
                      >
                        {event.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }),
          )}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-border flex flex-wrap gap-6 bg-surface-off">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-blue" />
            <span className="text-xs text-text">Disembark</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-green" />
            <span className="text-xs text-text">Embark</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-red" />
            <span className="text-xs text-text">Certificate Expiration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-amber" />
            <span className="text-xs text-text">Contract End</span>
          </div>
        </div>
      </div>
    </div>
  );
}
