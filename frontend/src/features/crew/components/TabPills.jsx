// src/features/crew/components/TabPills.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export const TAB_KEYS = [
  "personal_info",
  "qualifications",
  "appointment",
  "replacement",
  "payment",
  "family",
  "injury",
  "health",
  "experiences",
  "evaluation",
  "certificates",
  "accident",
];

const TAB_LABELS = {
  personal_info: "Personal Info",
  qualifications: "Qualifications",
  appointment: "Appointment",
  replacement: "Replacement",
  payment: "Payment",
  family: "Family",
  injury: "Injury",
  health: "Health",
  experiences: "Experiences",
  evaluation: "Evaluation",
  certificates: "Certificates",
  accident: "Accident",
};

export default function TabPills({ activeTab, setActiveTab }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2 px-6 py-4 border-b border-gray-200 bg-gray-50/80">
      {TAB_KEYS.map((key) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${
              activeTab === key
                ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-1"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
            }
          `}
        >
          {t(key) || TAB_LABELS[key] || key.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}