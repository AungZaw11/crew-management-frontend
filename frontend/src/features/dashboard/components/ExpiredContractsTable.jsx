// src/features/dashboard/components/ExpiredContractsTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function ExpiredContractsTable({ expiredData, loading, onSeeAll }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex h-[478px] flex-col rounded-md border border-[#E2E8F0] bg-white animate-pulse">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#EFF6FF] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FE0001]" />
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  const data = expiredData?.length > 0 ? expiredData : [];

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
          {t("see_all") || "See All"}
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-[#64748B]">
          {t("no_data") || "No expired contracts"}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[2fr_2fr_2fr_1fr] bg-[#F8FAFC] px-5 py-3 font-inter text-xs font-bold text-[#64748B]">
            <div>{t("crew_name") || "Crew Name"}</div>
            <div>{t("vessel") || "Vessel"}</div>
            <div>{t("rank") || "Rank"}</div>
            <div>{t("overdue") || "Overdue"}</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {data.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center border-b border-[#F1F5F9] px-5 py-3.5 font-inter text-xs cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/crew/${row.id}`)}
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
        </>
      )}
    </div>
  );
}