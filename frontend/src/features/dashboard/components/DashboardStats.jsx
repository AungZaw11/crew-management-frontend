// src/features/dashboard/components/DashboardStats.jsx
import React from "react";
import { FileCheck, FileText, FileSpreadsheet, Anchor } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const StatCard = ({ icon: Icon, label, value, subValue, color = "bg-blue-50", iconColor = "text-blue-600", loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-16 mt-2"></div>
        <div className="h-3 bg-gray-200 rounded w-20 mt-1"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value || 0}</p>
          {subValue !== undefined && (
            <p className="text-xs text-gray-400 mt-1">Total: {subValue}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default function DashboardStats({ stats, loading }) {
  const { t } = useLanguage();

  const statItems = [
    { 
      icon: FileCheck, 
      label: t("certificate") || "Certificate", 
      value: stats?.certificate || 0,
      subValue: stats?.certificateTotal || 0,
      color: "bg-blue-50", 
      iconColor: "text-blue-600" 
    },
    { 
      icon: FileText, 
      label: t("contract") || "Contract", 
      value: stats?.contract || 0,
      subValue: stats?.contractTotal || 0,
      color: "bg-green-50", 
      iconColor: "text-green-600" 
    },
    { 
      icon: FileSpreadsheet, 
      label: "PPT", 
      value: stats?.ppt || 0,
      subValue: stats?.pptTotal || 0,
      color: "bg-purple-50", 
      iconColor: "text-purple-600" 
    },
    { 
      icon: Anchor, 
      label: t("vessel") || "Vessel", 
      value: stats?.vessel || 0,
      subValue: stats?.vesselTotal || 0,
      color: "bg-amber-50", 
      iconColor: "text-amber-600" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <StatCard key={index} {...item} loading={loading} />
      ))}
    </div>
  );
}