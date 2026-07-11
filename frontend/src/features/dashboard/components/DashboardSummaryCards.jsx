// src/features/dashboard/components/DashboardSummaryCards.jsx
import React from "react";
import { FileText, Calendar, DollarSign, Clock } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ============================================================
// SUMMARY CARD - Reusable Component
// ============================================================
function SummaryCard({ icon: Icon, label, value, subValue, subLabel, loading, color = "bg-gray-50" }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-16 mt-1"></div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon size={20} className="text-gray-700" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{t(label) || label}</p>
          <p className="text-2xl font-bold text-gray-800">{value || 0}</p>
        </div>
      </div>
      {subValue !== undefined && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
          <span className="text-xs text-gray-400">{t(subLabel) || subLabel}</span>
          <span className="text-sm font-medium text-gray-700">{subValue}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// DASHBOARD SUMMARY CARDS - Component
// ============================================================
export default function DashboardSummaryCards({ stats, loading }) {
  const { t } = useLanguage();

  const summaryItems = [
    {
      icon: FileText,
      label: t("active_contracts") || "Active Contracts",
      value: stats?.activeContracts || 0,
      subValue: `${stats?.completionRate || 0}%`,
      subLabel: t("completion_rate") || "Completion Rate",
      color: "bg-blue-50",
    },
    {
      icon: Calendar,
      label: t("expiring_contracts") || "Expiring Contracts",
      value: stats?.expiringContracts || 0,
      subValue: t("next_30_days") || "Next 30 days",
      subLabel: t("due_soon") || "Due Soon",
      color: "bg-yellow-50",
    },
    {
      icon: DollarSign,
      label: t("pending_payments") || "Pending Payments",
      value: stats?.pendingPayments || 0,
      subValue: `$${stats?.totalAmount?.toLocaleString() || 0}`,
      subLabel: t("total_amount") || "Total Amount",
      color: "bg-green-50",
    },
    {
      icon: Clock,
      label: t("crew_available") || "Crew Available",
      value: stats?.availableCrew || 0,
      subValue: t("ready_to_deploy") || "Ready to deploy",
      subLabel: t("status") || "Status",
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item, index) => (
        <SummaryCard key={index} {...item} loading={loading} />
      ))}
    </div>
  );
}