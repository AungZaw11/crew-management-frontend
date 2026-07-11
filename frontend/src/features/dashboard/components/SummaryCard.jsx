// src/components/ui/SummaryCard.jsx
import React from "react";
import { useLanguage } from "../../common/hooks/LanguageContext";

export default function SummaryCard({ data }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-6 shadow-card flex flex-col gap-4 flex-1 min-w-[200px] sm:min-w-[250px]">
      <div className="flex justify-between items-center">
        <h3 className="text-brand font-semibold text-base sm:text-lg">
          {data.title}
        </h3>
        <button className="text-brand-light text-xs sm:text-sm font-medium hover:underline">
          See All →
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4">
        <div className="flex-1 bg-gradient-to-b from-surface-alt to-brand-lighter rounded border border-gray-200 p-3 sm:p-4 flex flex-col items-center justify-center">
          <span className="text-text-main text-xs sm:text-sm font-medium">
            {data.total}
          </span>
          <span className="text-accent-red font-bold text-base sm:text-xl mt-1">
            Expire
          </span>
        </div>
        <div className="flex-1 bg-surface-alt rounded border border-gray-200 p-3 sm:p-4 flex flex-col items-center justify-center">
          <span className="text-text-main text-xs sm:text-sm font-medium">
            {data.expire}
          </span>
          <span className="text-accent-orange font-bold text-base sm:text-xl mt-1">
            {data.days} Days
          </span>
        </div>
      </div>
    </div>
  );
}
