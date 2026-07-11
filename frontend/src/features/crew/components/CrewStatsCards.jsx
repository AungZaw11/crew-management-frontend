// src/features/crew/components/CrewStatsCards.jsx
import React from "react";
import { Users, Anchor, UserCheck, AlertCircle } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function CrewStatsCards({ crews, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-12 mt-1"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: t("total_crews") || "Total Crews",
      value: crews?.length || 0,
      icon: <Users size={24} className="text-brand" />,
      bgColor: "bg-brand-lighter",
    },
    {
      label: t("on_board") || "On Board",
      value: crews?.filter(c => c.status === "active").length || 0,
      icon: <Anchor size={24} className="text-accent-green" />,
      bgColor: "bg-green-50",
    },
    {
      label: t("active_crews") || "Active Crews",
      value: crews?.filter(c => c.isActive !== false).length || 0,
      icon: <UserCheck size={24} className="text-brand-blue" />,
      bgColor: "bg-blue-50",
    },
    {
      label: t("compliance_issues") || "Compliance Issues",
      value: crews?.filter(c => c.complianceIssues > 0).length || 0,
      icon: <AlertCircle size={24} className="text-accent-red" />,
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <p className="text-sm text-text-light font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-text-main mt-1">{stat.value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}