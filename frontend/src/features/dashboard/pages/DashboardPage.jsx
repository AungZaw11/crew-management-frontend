// src/features/dashboard/pages/DashboardPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useDashboard } from "../hooks/useDashboard";
import SummaryCards from "../components/SummaryCards";
import CrewPieChart from "../components/CrewPieChart";
import ExpiredContractsTable from "../components/ExpiredContractsTable";
import ExpireSoonTable from "../components/ExpireSoonTable";

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center flex-col gap-4">
        <p className="text-red-500 text-lg">Error loading dashboard</p>
        <p className="text-text-light">{error}</p>
        <button 
          onClick={() => { resetError(); loadDashboard(); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text tracking-wide">
          {t("overview") || "Overview"}
        </h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-brand-muted rounded-[6px] bg-surface text-sm text-text hover:bg-gray-50 transition-colors">
            <Upload size={16} />
            {t("export") || "Export"}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            {t("add_crew") || "Add New"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards stats={stats} loading={loading} />

      {/* Pie Chart + Expired Contracts Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CrewPieChart
          totalCrews={totalCrews || 0}
          signOn={signOn || 0}
          signOff={signOff || 0}
          loading={loading}
        />
        <ExpiredContractsTable 
          expiredData={expiredData} 
          loading={loading} 
          onSeeAll={handleSeeAllExpired}
        />
      </div>

      {/* Expire Soon Table (အောက်မှာ Full Width) */}
      <div className="mt-2">
        <ExpireSoonTable 
          expireSoonData={expireSoonData} 
          loading={loading} 
          onSeeAll={handleSeeAllExpireSoon}
        />
      </div>
    </div>
  );
}