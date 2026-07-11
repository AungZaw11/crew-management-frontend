// src/features/dashboard/components/DashboardStats.jsx
import React from "react";
import { Users, Anchor, UserCheck, AlertCircle } from "lucide-react";

// ============================================================
// STAT CARD - Reusable Component
// ============================================================
export function StatCard({ icon: Icon, label, value, loading, color = "bg-blue-50", iconColor = "text-blue-600" }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-16 mt-2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-text-light font-medium">{label}</p>
        <p className="text-3xl font-bold text-text-main mt-1">{value || 0}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon size={24} className={iconColor} />
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD STATS - Component
// ============================================================
export default function DashboardStats({ stats, loading }) {
  const statItems = [
    { 
      icon: Users, 
      label: "Total Crews", 
      value: stats?.totalCrew || 0 
    },
    { 
      icon: Anchor, 
      label: "Sign On", 
      value: stats?.signOn || 0,
      color: "bg-green-50", 
      iconColor: "text-green-600" 
    },
    { 
      icon: UserCheck, 
      label: "Active Crews", 
      value: stats?.activeCrew || 0,
      color: "bg-blue-50", 
      iconColor: "text-blue-600" 
    },
    { 
      icon: AlertCircle, 
      label: "Compliance Issues", 
      value: stats?.expiredCertificates || 0,
      color: "bg-red-50", 
      iconColor: "text-red-600" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <StatCard key={index} {...item} loading={loading} />
      ))}
    </div>
  );
}