// src/pages/dashboard/CrewCalendar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Plus,
  ChevronDown,
  List,
  Calendar,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SummaryCard from "../../components/ui/SummaryCard";

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

const mockSummary = [
  { title: "Certificate", total: 72, expire: 24, days: 30 },
  { title: "Contract", total: 72, expire: 24, days: 30 },
  { title: "PPT", total: 72, expire: 24, days: 30 },
  { title: "Payout", total: 72, expire: 24, days: 30 },
];

export default function CrewCalendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState("March 2026");

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-text-main">Overview</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-brand text-text-main hover:bg-brand-lighter transition-colors text-sm font-medium">
            <Download size={16} /> Export
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* Summary Cards - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockSummary.map((stat, i) => (
          <SummaryCard key={i} data={stat} />
        ))}
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-md border border-gray-200 shadow-card flex flex-col overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-surface-alt">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Vessel's Name</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Rank</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">
                2026-03-07 - 2026-07-31
              </span>
              <Calendar size={14} className="text-text-main" />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer hover:text-brand transition-colors">
              <CheckSquare size={18} className="text-text-main" />
              <span className="text-sm text-text-main">
                Include the employee Period Contract
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/crew")}
                className="p-2 rounded border border-text-main text-text-main hover:bg-gray-50 transition-colors"
              >
                <List size={18} />
              </button>
              <button className="p-2 rounded bg-text-main text-white">
                <Calendar size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white border border-border rounded-[6px] shadow-card overflow-hidden">
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
    </div>
  );
}
