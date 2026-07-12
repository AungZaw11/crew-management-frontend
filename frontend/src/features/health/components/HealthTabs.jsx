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
    <div className="flex items-center gap-6">
      <span className="text-sm font-medium text-gray-500">
        {t("view") || "View"}:
      </span>
      <div className="flex gap-1">
        {HEALTH_TAB_KEYS.map((key) => {
          const isActive = activeTab === key;
          const label = HEALTH_TAB_LABELS[key] || key;
          
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
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