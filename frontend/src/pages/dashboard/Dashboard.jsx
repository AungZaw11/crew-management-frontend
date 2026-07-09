// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Plus,
  ArrowRight,
  Search,
  ChevronDown,
  CheckSquare,
  Calendar,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useCrew } from "../../context/CrewContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useLanguage } from "../../context/LanguageContext";

// ===== SUMMARY CARDS (Dynamic) =====
function SummaryCards({ stats, t }) {
  const cards = [
    {
      title: t("certificate") || "Certificate",
      count: stats?.certificate?.count || "0",
      leftVal: stats?.certificate?.expired || "0",
      leftLabel: t("expired") || "Expired",
      rightVal: stats?.certificate?.days30 || "0",
      rightLabel: `30 ${t("days") || "Days"}`,
    },
    {
      title: t("contract") || "Contract",
      count: stats?.contract?.count || "0",
      leftVal: stats?.contract?.expired || "0",
      leftLabel: t("expired") || "Expired",
      rightVal: stats?.contract?.days30 || "0",
      rightLabel: `30 ${t("days") || "Days"}`,
    },
    {
      title: t("ppt") || "PPT",
      count: stats?.ppt?.count || "0",
      leftVal: stats?.ppt?.expired || "0",
      leftLabel: t("expired") || "Expired",
      rightVal: stats?.ppt?.days30 || "0",
      rightLabel: `30 ${t("days") || "Days"}`,
    },
    {
      title: t("vessel") || "Vessel",
      count: stats?.vessel?.count || "0",
      leftVal: stats?.vessel?.active || "0",
      leftLabel: t("active") || "Active",
      leftLabelColor: "text-[#315888]",
      rightVal: stats?.vessel?.inactive || "0",
      rightLabel: t("inactive") || "InActive",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex flex-col rounded-md border border-[#E5E7EB] bg-white p-5 shadow-[0px_4px_4px_rgba(79,129,189,0.25)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-ibm-plex text-xl font-medium text-[#315888]">
              {card.title}
            </h3>
            <div className="flex h-6 items-center justify-center rounded bg-[#002F67] px-2 text-xs font-semibold text-[#EFF6FF]">
              {card.count}
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="flex flex-1 flex-col items-center justify-center rounded bg-gradient-to-t from-[#EFF6FF] to-[#FBFDFF] py-4 border border-[#E5E7EB]">
              <span className="font-ibm-plex text-[32px] font-bold leading-none text-[#3C5065]">
                {card.leftVal}
              </span>
              <span
                className={`mt-2 font-ibm-plex text-base font-medium ${
                  card.leftLabelColor || "text-[#FE0001]"
                }`}
              >
                {card.leftLabel}
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center rounded border border-[#E5E7EB] bg-[#FBFDFF] py-4">
              <span className="font-ibm-plex text-[32px] font-bold leading-none text-[#3C5065]">
                {card.rightVal}
              </span>
              <span className="mt-2 font-ibm-plex text-base font-medium text-[#FFB44F]">
                {card.rightLabel}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== CREW PIE CHART (Dynamic) =====
function CrewPieChart({ totalCrews, signOn, signOff, t }) {
  const data = [
    { name: t("sign_on") || "Sign On", value: signOn || 0, color: "#4D55A8" },
    {
      name: t("sign_off") || "Sign Off",
      value: signOff || 0,
      color: "#D97F79",
    },
  ];

  return (
    <div className="flex h-[478px] flex-col rounded-md border border-[#E5E7EB] bg-white p-6">
      <div className="flex justify-between px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#171A1F]" />
            <span className="font-inter text-xs text-black">
              {t("total_crews") || "Total Crews"}
            </span>
          </div>
          <span className="mt-2 font-inter text-xl font-semibold text-[#315888]">
            {totalCrews || 0}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#7179D2]" />
            <span className="font-inter text-xs text-black">
              {t("sign_on") || "Sign On"}
            </span>
          </div>
          <span className="mt-2 font-inter text-xl font-semibold text-[#4D55A8]">
            {signOn || 0}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#D97F79]" />
            <span className="font-inter text-xs text-black">
              {t("sign_off") || "Sign Off"}
            </span>
          </div>
          <span className="mt-2 font-inter text-xl font-semibold text-[#D97F79]">
            {signOff || 0}
          </span>
        </div>
      </div>

      <div className="relative mt-8 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-inter text-xs font-semibold text-black">
            {t("total") || "Total"}
          </span>
          <span className="font-inter text-2xl font-semibold text-[#315888]">
            {totalCrews || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

// ===== EXPIRED CONTRACTS TABLE (Dynamic) =====
function ExpiredContractsTable({ expiredData, loading, t, onSeeAll }) {
  if (loading) {
    return (
      <div className="flex h-[478px] items-center justify-center rounded-md border border-[#E2E8F0] bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  // ===== Data မရှိရင်လည်း See All ပါ =====
  if (!expiredData || expiredData.length === 0) {
    return (
      <div className="flex h-[478px] flex-col rounded-md border border-[#E2E8F0] bg-white">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#EFF6FF] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FE0001]" />
            <h2 className="font-ibm-plex text-xl font-medium text-[#3C5065]">
              {t("expired_contracts") || "Expired Contracts"}
            </h2>
          </div>
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 rounded bg-[#3C5065] px-3 py-1.5 text-xs font-bold text-[#EFF6FF] hover:bg-[#4a6077] transition-colors"
          >
            {t("see_all") || "See All"} <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center text-[#64748B]">
          {t("no_data") || "No expired contracts"}
        </div>
      </div>
    );
  }

  // ===== Data ရှိရင်လည်း See All ပါ =====
  return (
    <div className="flex h-[478px] flex-col rounded-md border border-[#E2E8F0] bg-white">
      <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#EFF6FF] px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FE0001]" />
          <h2 className="font-ibm-plex text-xl font-medium text-[#3C5065]">
            {t("expired_contracts") || "Expired Contracts"}
          </h2>
        </div>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1 rounded bg-[#3C5065] px-3 py-1.5 text-xs font-bold text-[#EFF6FF] hover:bg-[#4a6077] transition-colors"
        >
          {t("see_all") || "See All"} <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-[2fr_2fr_2fr_1fr] bg-[#F8FAFC] px-5 py-3 font-inter text-xs font-bold text-[#64748B]">
        <div>{t("crew_name") || "Crew Name"}</div>
        <div>{t("vessel") || "Vessel"}</div>
        <div>{t("rank") || "Rank"}</div>
        <div>{t("overdue") || "Overdue"}</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {expiredData.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center border-b border-[#F1F5F9] px-5 py-3.5 font-inter text-xs"
          >
            <div className="text-[#0F172A]">{row.name}</div>
            <div className="text-[#475569]">{row.vessel}</div>
            <div className="text-[#475569]">{row.rank}</div>
            <div>
              <span className="inline-flex rounded-full bg-[#FEE2E2] px-2 py-1 font-bold text-[#B91C1C]">
                {row.overdue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== EXPIRE SOON TABLE (Dynamic) =====
function ExpireSoonTable({ expireSoonData, loading, t, onSeeAll }) {
  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-md border border-[#E2E8F0] bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  // ===== Data မရှိရင်လည်း See All ပါ =====
  if (!expireSoonData || expireSoonData.length === 0) {
    return (
      <div className="flex flex-col rounded-md border border-[#E2E8F0] bg-white">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#EFF6FF] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF928A]" />
            <h2 className="font-ibm-plex text-xl font-medium text-[#315888]">
              {t("expire_soon") || "Expire Soon"}
            </h2>
          </div>
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 rounded bg-[#3C5065] px-3 py-1.5 text-xs font-bold text-[#EFF6FF] hover:bg-[#4a6077] transition-colors"
          >
            {t("see_all") || "See All"} <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex h-[200px] items-center justify-center text-[#64748B]">
          {t("no_data") || "No expire soon records"}
        </div>
      </div>
    );
  }

  // ===== Data ရှိရင်လည်း See All ပါ =====
  return (
    <div className="flex flex-col rounded-md border border-[#E2E8F0] bg-white">
      <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#EFF6FF] px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF928A]" />
          <h2 className="font-ibm-plex text-xl font-medium text-[#315888]">
            {t("expire_soon") || "Expire Soon"}
          </h2>
        </div>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1 rounded bg-[#3C5065] px-3 py-1.5 text-xs font-bold text-[#EFF6FF] hover:bg-[#4a6077] transition-colors"
        >
          {t("see_all") || "See All"} <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-[1.5fr_1.5fr_1fr_3fr_2fr_1fr] bg-[#F8FAFC] px-5 py-3 font-inter text-xs font-bold text-[#64748B]">
        <div>{t("crew_name") || "Crew Name"}</div>
        <div>{t("vessel") || "Vessel"}</div>
        <div>{t("rank") || "Rank"}</div>
        <div>{t("education_name") || "Education Name"}</div>
        <div>{t("expire_date") || "Expire Date"}</div>
        <div>{t("remaining_date") || "Remaining Date"}</div>
      </div>
      <div>
        {expireSoonData.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[1.5fr_1.5fr_1fr_3fr_2fr_1fr] items-center border-b border-[#F1F5F9] px-5 py-3.5 font-inter text-xs"
          >
            <div className="text-[#0F172A]">{row.name}</div>
            <div className="text-[#475569]">{row.vessel}</div>
            <div className="text-[#475569]">{row.rank}</div>
            <div className="text-[#475569]">{row.education}</div>
            <div className="text-[#475569]">{row.expireDate}</div>
            <div>
              <span className="inline-flex rounded-full bg-[#FEEED9] px-2 py-1 font-bold text-[#B91C1C]">
                {row.remaining}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== MAIN DASHBOARD =====
export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { crews, loading, totalCrews, fetchCrews } = useCrew();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [expiredData, setExpiredData] = useState([]);
  const [expireSoonData, setExpireSoonData] = useState([]);

  // ===== FETCH DASHBOARD DATA FROM API =====
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await fetchCrews(0, 100);
        const stats = calculateStats(crews);
        setDashboardStats(stats);
        const expired = getExpiredCrews(crews);
        const expireSoon = getExpireSoonCrews(crews);
        setExpiredData(expired);
        setExpireSoonData(expireSoon);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // ===== CALCULATE STATS =====
  const calculateStats = (crewData) => {
    return {
      certificate: {
        count: crewData?.length || 0,
        expired: crewData?.filter((c) => c.status === "expired").length || 0,
        days30: crewData?.filter((c) => c.daysRemaining <= 30).length || 0,
      },
      contract: {
        count: crewData?.length || 0,
        expired:
          crewData?.filter((c) => c.contractStatus === "expired").length || 0,
        days30: crewData?.filter((c) => c.contractDays <= 30).length || 0,
      },
      ppt: {
        count: crewData?.length || 0,
        expired: crewData?.filter((c) => c.pptStatus === "expired").length || 0,
        days30: crewData?.filter((c) => c.pptDays <= 30).length || 0,
      },
      vessel: {
        count: crewData?.length || 0,
        active:
          crewData?.filter((c) => c.vesselStatus === "active").length || 0,
        inactive:
          crewData?.filter((c) => c.vesselStatus === "inactive").length || 0,
      },
    };
  };

  // ===== GET EXPIRED CREWS =====
  const getExpiredCrews = (crewData) => {
    return (
      crewData
        ?.filter((c) => c.overdueDays && c.overdueDays < 0)
        ?.map((c) => ({
          name: c.name || "Unknown",
          vessel: c.vessel || "-",
          rank: c.rank || "-",
          overdue: `${c.overdueDays || 0} Days`,
        })) || []
    );
  };

  // ===== GET EXPIRE SOON CREWS =====
  const getExpireSoonCrews = (crewData) => {
    return (
      crewData
        ?.filter(
          (c) =>
            c.daysRemaining && c.daysRemaining <= 30 && c.daysRemaining > 0,
        )
        ?.map((c) => ({
          name: c.name || "Unknown",
          vessel: c.vessel || "-",
          rank: c.rank || "-",
          education: c.education || "-",
          expireDate: c.expireDate || "-",
          remaining: `${c.daysRemaining || 0} Days`,
        })) || []
    );
  };

  // ===== SEE ALL HANDLERS - Navigate to Crew Management =====
  const handleSeeAllExpired = () => {
    navigate("/crew");
  };

  const handleSeeAllExpireSoon = () => {
    navigate("/crew");
  };

  return (
    <div className="w-full flex flex-col gap-6">
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
      <SummaryCards stats={dashboardStats} t={t} />

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CrewPieChart
          totalCrews={totalCrews || 0}
          signOn={0}
          signOff={0}
          t={t}
        />
        <ExpiredContractsTable
          expiredData={expiredData}
          loading={loading}
          t={t}
          onSeeAll={handleSeeAllExpired}
        />
      </div>

      {/* Expire Soon Table */}
      <div className="mt-2">
        <ExpireSoonTable
          expireSoonData={expireSoonData}
          loading={loading}
          t={t}
          onSeeAll={handleSeeAllExpireSoon}
        />
      </div>
    </div>
  );
}
