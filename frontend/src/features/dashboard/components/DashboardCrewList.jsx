// src/features/dashboard/components/DashboardCrewList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function DashboardCrewList({ crews, loading }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const data = crews?.length > 0 ? crews : [
    "Mg Mg", "Aung Aung", "Ko Htoo", "Hla Hla", "Ye Htet", "Lin Lin", "John K"
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          {t("crew_name") || "Crew Name"}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((name, index) => (
          <button
            key={index}
            onClick={() => navigate(`/crew/${index + 1}`)}
            className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm text-gray-700 hover:text-blue-700 transition-colors"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}