// src/features/dashboard/pages/DashboardPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useDashboard } from "../hooks/useDashboard";
import { Upload, Plus } from "lucide-react";
import DashboardStats from "../components/DashboardStats";
import DashboardSummaryCards from "../components/DashboardSummaryCards";
import DashboardPieChart from "../components/DashboardPieChart";
import DashboardExpiredTable from "../components/DashboardExpiredTable";
import DashboardExpireSoonTable from "../components/DashboardExpireSoonTable";

// ============================================================
// DASHBOARD PAGE - Container Component
// ============================================================
export default function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    stats,
    totalCrews,
    signOn,
    signOff,
    expiredData,
    expireSoonData,
    loading,
    error,
    loadDashboard,
    resetError,
  } = useDashboard();

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSeeAllExpired = () => navigate("/crew");
  const handleSeeAllExpireSoon = () => navigate("/crew");

  // ===== ERROR HANDLING =====
  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center flex-col gap-4">
        <p className="text-red-500 text-lg">Error loading dashboard</p>
        <p className="text-text-light">{error}</p>
        <button 
          onClick={() => { resetError(); loadDashboard(); }}
          className="px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text tracking-wide">
          {t("overview") || "Overview"}
        </h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-brand-muted rounded-[6px] bg-surface text-sm text-text hover:bg-gray-50 transition-colors">
            <Upload size={16} /> {t("export") || "Export"}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
          >
            <Plus size={16} /> {t("add_crew") || "Add New"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} loading={loading} />

      {/* Summary Cards */}
      <DashboardSummaryCards stats={stats} loading={loading} />

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardPieChart
          totalCrews={totalCrews}
          signOn={signOn}
          signOff={signOff}
          loading={loading}
        />
        <DashboardExpiredTable
          expiredData={expiredData}
          loading={loading}
          onSeeAll={handleSeeAllExpired}
        />
      </div>

      {/* Expire Soon Table */}
      <div className="mt-2">
        <DashboardExpireSoonTable
          expireSoonData={expireSoonData}
          loading={loading}
          onSeeAll={handleSeeAllExpireSoon}
        />
      </div>
    </div>
  );
}