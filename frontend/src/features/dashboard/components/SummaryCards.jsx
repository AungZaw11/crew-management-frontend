// src/features/dashboard/components/SummaryCards.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function SummaryCards({ stats, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col rounded-md border border-[#E5E7EB] bg-white p-5 shadow-[0px_4px_4px_rgba(79,129,189,0.25)] animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-6 flex gap-4">
              <div className="flex-1 h-20 bg-gray-200 rounded"></div>
              <div className="flex-1 h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: t("certificate") || "Certificate",
      count: stats?.certificateCount || 0,
      leftVal: stats?.certificateLeft || 0,
      leftLabel: "Overdue",
      leftLabelColor: "text-[#FE0001]",
      rightVal: stats?.certificateRight || 0,
      rightLabel: "Expire Soon",
    },
    {
      title: t("contract") || "Contract",
      count: stats?.contractCount || 0,
      leftVal: stats?.contractLeft || 0,
      leftLabel: "Overdue",
      leftLabelColor: "text-[#FE0001]",
      rightVal: stats?.contractRight || 0,
      rightLabel: "Expire Soon",
    },
    {
      title: "PPT",
      count: stats?.pptCount || 0,
      leftVal: stats?.pptLeft || 0,
      leftLabel: "Overdue",
      leftLabelColor: "text-[#FE0001]",
      rightVal: stats?.pptRight || 0,
      rightLabel: "Expire Soon",
    },
    {
      title: t("vessel") || "Vessel",
      count: stats?.vesselCount || 0,
      leftVal: stats?.vesselLeft || 0,
      leftLabel: "Overdue",
      leftLabelColor: "text-[#FE0001]",
      rightVal: stats?.vesselRight || 0,
      rightLabel: "Expire Soon",
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