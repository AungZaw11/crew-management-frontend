// src/features/crew/components/TabPills.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ===== TAB KEYS =====
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
  "accident",
];

// ===== TAB LABELS =====
export const TAB_LABELS = {
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
  
  accident: "Accident",
};

// ===== TAB ICONS (optional) =====
export const TAB_ICONS = {
  personal_info: "👤",
  qualifications: "📜",
  appointment: "📅",
  replacement: "🔄",
  payment: "💰",
  family: "👨‍👩‍👧‍👦",
  injury: "🩹",
  health: "🏥",
  experiences: "💼",
  evaluation: "⭐",
  certificates: "📄",
  accident: "⚠️",
};

// ===== MAIN COMPONENT =====
export default function TabPills({
  activeTab,
  setActiveTab,
  tabs = TAB_KEYS,
  customLabels = {},
  showIcons = false,
  className = "",
  pillClassName = "",
  activeClassName = "",
  inactiveClassName = "",
  isPersonalInfoValid = true,  
  hasCrewId = false, 
}) {
  const { t } = useLanguage();

   const handleTabChange = (tabKey) => {
    
    if (activeTab === TAB_KEYS[0] && tabKey !== TAB_KEYS[0]) {
      if (!isPersonalInfoValid) {
        alert("Please complete Personal Information first!");
        return;
      }
      if (!hasCrewId) {
        alert("Please save Personal Information first!");
        return;
      }
    }
    setActiveTab(tabKey);
  };

  const getTabLabel = (tabKey) => {
    return customLabels[tabKey] || t(tabKey) || TAB_LABELS[tabKey] || tabKey.replace("_", " ");
  };

  const getTabIcon = (tabKey) => {
    return TAB_ICONS[tabKey] || "";
  };

  return (
    <div
      className={`border-b border-gray-200 bg-[#FBFDFF] px-10 py-6 md:px-8 ${className}`}
    >
      <div
        role="tablist"
        aria-label={t("crew_profile_sections") || "Crew profile sections"}
        className="flex flex-wrap gap-4"
      >
        {tabs.map((tabKey) => {
          const active = activeTab === tabKey;
          const label = getTabLabel(tabKey);
          const icon = showIcons ? getTabIcon(tabKey) : "";

          return (
            <button
              key={tabKey}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tabKey)}
              className={`
                w-[168px] rounded-full border py-1.5 text-base transition-all duration-200
                ${active 
                  ? `border-[#002F67] bg-[#002F67] font-medium text-[#EFF6FF] shadow-sm ${activeClassName}`
                  : `border-[#315888] bg-white text-[#315888] hover:bg-slate-50 hover:border-[#002F67] ${inactiveClassName}`
                }
                ${pillClassName}
              `}
            >
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}