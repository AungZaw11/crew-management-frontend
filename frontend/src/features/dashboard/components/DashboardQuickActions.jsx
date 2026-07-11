// src/features/dashboard/components/DashboardQuickActions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, FileText, Calendar, BarChart3, Settings, Bell } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function DashboardQuickActions() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    { label: t("add_crew") || "Add Crew", icon: <UserPlus size={20} />, path: "/crew/new", color: "bg-blue-500" },
    { label: t("calendar") || "Calendar", icon: <Calendar size={20} />, path: "/crew/calendar", color: "bg-green-500" },
    { label: t("reports") || "Reports", icon: <FileText size={20} />, path: "/reports", color: "bg-purple-500" },
    { label: t("notifications") || "Notifications", icon: <Bell size={20} />, path: "/notifications", color: "bg-red-500" },
    { label: t("dashboard") || "Dashboard", icon: <BarChart3 size={20} />, path: "/dashboard", color: "bg-orange-500" },
    { label: t("settings") || "Settings", icon: <Settings size={20} />, path: "/settings", color: "bg-gray-500" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {t("quick_actions") || "Quick Actions"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className={`p-3 rounded-full ${action.color} text-white group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <span className="text-xs font-medium text-gray-600 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}