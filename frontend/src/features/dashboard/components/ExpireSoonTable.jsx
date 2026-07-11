// src/features/dashboard/components/ExpireSoonTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function ExpireSoonTable({ expireSoonData, loading, onSeeAll }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex flex-col rounded-md border border-[#E2E8F0] bg-white animate-pulse">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#EFF6FF] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF928A]" />
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex h-[200px] items-center justify-center">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  const data = expireSoonData?.length > 0 ? expireSoonData : [];

  return (
    <div className="flex flex-col rounded-md border border-[#E2E8F0] bg-white">
      {/* Header */}
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
          {t("see_all") || "See All"} 
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center text-[#64748B]">
          {t("no_data") || "No expire soon records"}
        </div>
      ) : (
        <>
          {/* ✅ Column Headers */}
          <div className="grid grid-cols-[1.5fr_1.5fr_1fr_3fr_2fr_1.5fr] bg-[#F8FAFC] px-5 py-3 font-inter text-xs font-bold text-[#64748B]">
            <div>{t("crew_name") || "Crew Name"}</div>
            <div>{t("vessel") || "Vessel"}</div>
            <div>{t("rank") || "Rank"}</div>
            <div>{t("education_name") || "Education Name"}</div>
            <div>{t("expire_date") || "Expire Date"}</div>
            <div>{t("remaining_date") || "Remaining Days"}</div>
          </div>

          {/* ✅ Data Rows */}
          <div>
            {data.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.5fr_1.5fr_1fr_3fr_2fr_1.5fr] items-center border-b border-[#F1F5F9] px-5 py-3.5 font-inter text-xs cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/crew/${row.id}`)}
              >
                <div className="text-[#0F172A] font-medium">{row.name}</div>
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
        </>
      )}
    </div>
  );
}