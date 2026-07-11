// src/features/calendar/components/CalendarLegend.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const LEGEND_ITEMS = [
  { color: "bg-blue-500", label: "disembark" },
  { color: "bg-green-500", label: "embark" },
  { color: "bg-red-500", label: "certificate_expiration" },
  { color: "bg-yellow-500", label: "contract_end" },
];

export default function CalendarLegend() {
  const { t } = useLanguage();

  return (
    <div className="p-4 border-t border-gray-200 flex flex-wrap gap-6 bg-gray-50/50">
      {LEGEND_ITEMS.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <span className="text-xs text-gray-600">
            {t(item.label) || item.label.replace("_", " ")}
          </span>
        </div>
      ))}
    </div>
  );
}