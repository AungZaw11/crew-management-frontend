// src/features/crew/components/CrewStatusBadge.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  on_leave: {
    label: "On Leave",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    dot: "bg-gray-400",
  },
  terminated: {
    label: "Terminated",
    className: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  pending: {
    label: "Pending",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
};

export default function CrewStatusBadge({ status, size = "sm" }) {
  const { t } = useLanguage();
  
  const config = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.inactive;
  const sizeClasses = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.className} ${sizeClasses} font-medium`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {t(config.label) || config.label}
    </span>
  );
}