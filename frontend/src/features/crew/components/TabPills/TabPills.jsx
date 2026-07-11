// src/features/crew/components/TabPills/index.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ==================== CONSTANTS ====================

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

// Tab display names with translation keys
export const TAB_LABELS = {
  en: {
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
  },
  kr: {
    personal_info: "개인 정보",
    qualifications: "자격",
    appointment: "임명",
    replacement: "교체",
    payment: "결제",
    family: "가족",
    injury: "부상",
    health: "건강",
    experiences: "경력",
    evaluation: "평가",
    certificates: "자격증",
    accident: "사고",
  },
};

// For backward compatibility
export const TABS = TAB_KEYS;

// ==================== SUB COMPONENTS ====================

// Single Tab Button
function TabButton({ tabKey, label, isActive, onClick }) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onClick(tabKey)}
      className={`w-[168px] rounded-full border py-1.5 text-base transition-colors ${
        isActive
          ? "border-[#002F67] bg-[#002F67] font-medium text-[#EFF6FF]"
          : "border-[#315888] bg-white text-[#315888] hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

// ==================== MAIN COMPONENT ====================

export function TabPills({ activeTab, setActiveTab, className = "" }) {
  const { language, t } = useLanguage();

  const getTabLabel = (tabKey) => {
    return TAB_LABELS[language]?.[tabKey] || TAB_LABELS.en[tabKey] || tabKey;
  };

  return (
    <div className={`border-b border-gray-200 bg-[#FBFDFF] px-10 py-6 md:px-8 ${className}`}>
      <div
        role="tablist"
        aria-label={t("crew_profile_sections") || "Crew profile sections"}
        className="flex flex-wrap gap-4"
      >
        {TAB_KEYS.map((tabKey) => (
          <TabButton
            key={tabKey}
            tabKey={tabKey}
            label={getTabLabel(tabKey)}
            isActive={activeTab === tabKey}
            onClick={setActiveTab}
          />
        ))}
      </div>
    </div>
  );
}