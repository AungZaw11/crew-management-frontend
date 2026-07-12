// src/features/crew/components/TabPills.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export const TAB_KEYS = [
  "personal_info",
  "qualifications",
  "appointment",
  "replacement",
  "payment",
  "family",
  "health",
  "experiences",
  "evaluation",
  "accident",
];

export const TAB_LABELS = {
  personal_info: "Personal Info",
  qualifications: "Qualifications",
  appointment: "Appointment",
  replacement: "Replacement",
  payment: "Payment",
  family: "Family",
  health: "Health",
  experiences: "Experiences",
  evaluation: "Evaluation",
  accident: "Accident",
};

export const TAB_ROUTE_MAP = {
  personal_info: "",
  qualifications: "qualifications",
  appointment: "appointment",
  replacement: "replacement",
  payment: "payment",
  family: "family",
  health: "health",
  experiences: "experience",
  evaluation: "evaluation",
  accident: "accident",
};

export const ROUTE_TAB_MAP = Object.fromEntries(
  Object.entries(TAB_ROUTE_MAP).map(([key, value]) => [value, key])
);

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
  crewId,
  isEditMode = false,
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTabFromUrl = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    return ROUTE_TAB_MAP[lastSegment] || TAB_KEYS[0];
  };

  const handleTabChange = (tabKey) => {
    if (setActiveTab) {
      setActiveTab(tabKey);
    }
    
    if (crewId) {
      const basePath = isEditMode ? `/crew/${crewId}/edit` : `/crew/${crewId}`;
      const routePath = TAB_ROUTE_MAP[tabKey];
      if (routePath) {
        navigate(`${basePath}/${routePath}`);
      } else {
        navigate(basePath);
      }
    }
  };

  const currentActiveTab = activeTab || getActiveTabFromUrl();

  const getTabLabel = (tabKey) => {
    return customLabels[tabKey] || t(tabKey) || TAB_LABELS[tabKey] || tabKey.replace("_", " ");
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
          const active = currentActiveTab === tabKey;
          const label = getTabLabel(tabKey);

          return (
            <button
              key={tabKey}
              role="tab"
              aria-selected={active}
              onClick={() => handleTabChange(tabKey)}
              className={`
                w-[168px] rounded-full border py-1.5 text-base transition-all duration-200
                ${active 
                  ? `border-[#002F67] bg-[#002F67] font-medium text-[#EFF6FF] shadow-sm ${activeClassName}`
                  : `border-[#315888] bg-white text-[#315888] hover:bg-slate-50 hover:border-[#002F67] ${inactiveClassName}`
                }
                ${pillClassName}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}