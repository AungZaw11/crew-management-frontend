// src/features/dashboard/components/DashboardSummaryCards.jsx
import React from "react";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const SummaryCard = ({ icon: Icon, label, value, subValue, color = "bg-gray-50", loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-16 mt-1"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon size={20} className="text-gray-700" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value || 0}</p>
          {subValue !== undefined && (
            <p className="text-xs text-gray-400">Total: {subValue}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DashboardSummaryCards({ stats, loading }) {
  const { t } = useLanguage();

  const items = [
    {
      icon: UserCheck,
      label: t("active") || "Active",
      value: stats?.active || 0,
      subValue: stats?.totalCrews || 0,
      color: "bg-green-50",
    },
    {
      icon: UserX,
      label: t("inactive") || "InActive",
      value: stats?.inactive || 0,
      subValue: stats?.totalCrews || 0,
      color: "bg-red-50",
    },
    {
      icon: Users,
      label: t("total_crews") || "Total Crews",
      value: stats?.totalCrews || 0,
      color: "bg-blue-50",
    },
    {
      icon: UserPlus,
      label: t("sign_on") || "Sign On",
      value: stats?.signOn || 0,
      subValue: stats?.signOff || 0,
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item, index) => (
        <SummaryCard key={index} {...item} loading={loading} />
      ))}
    </div>
  );
}