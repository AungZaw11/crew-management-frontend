// src/features/dashboard/components/DashboardVesselRank.jsx
import React from "react";
import { Anchor, Award } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function DashboardVesselRank({ stats, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const vesselData = stats?.vesselData || [
    { name: "Sun Rio", count: 24, total: 14 },
    { name: "Woori Sun", count: 18, total: 10 },
    { name: "HS Glory", count: 15, total: 8 },
    { name: "Oriental Star", count: 12, total: 6 },
  ];

  const rankData = stats?.rankData || [
    { name: "Ko Htoo", rank: "Captain" },
    { name: "Hla Hla", rank: "Pilot" },
    { name: "Ye Htet", rank: "Captain" },
    { name: "Lin Lin", rank: "Pilot" },
    { name: "John K", rank: "Captain" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Vessel */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Anchor size={18} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {t("vessel") || "Vessel"}
          </h2>
        </div>
        <div className="space-y-2">
          {vesselData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm text-gray-700">{item.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Total: {item.total}</span>
                <span className="text-sm font-medium text-blue-600">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} className="text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {t("rank") || "Rank"}
          </h2>
        </div>
        <div className="space-y-2">
          {rankData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="text-sm text-purple-600 font-medium">{item.rank}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}