// src/features/health/components/HealthTabs.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export const HEALTH_TAB_KEYS = ["injury", "medical_checkup", "disease"];

export const HEALTH_TAB_LABELS = {
  injury: "Injury",
  medical_checkup: "Medical Checkup",
  disease: "Disease",
};

export default function HealthTabs({ activeTab, setActiveTab }) {
  const { t } = useLanguage();

  return (
    <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-3">
      <div className="flex gap-2">
        {HEALTH_TAB_KEYS.map((key) => {
          const isActive = activeTab === key;
          const label = HEALTH_TAB_LABELS[key] || key;
          
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t(key) || label}
            </button>
          );
        })}
      </div>
    </div>
  );
}