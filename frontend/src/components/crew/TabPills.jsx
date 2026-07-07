// src/components/crew/TabPills.jsx
import React from "react";

export const TABS = [
  "Personal Info",
  "Qualifications",
  "Appointment",
  "Replacement",
  "Payment",
  "Family",
  "Injury",
  "Health",
  "Experiences",
  "Evaluation",
  "Certificates",
  "Accident",
];

export function TabPills({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 bg-[#FBFDFF] px-6 py-6 md:px-5">
      <div
        role="tablist"
        aria-label="Crew profile sections"
        className="flex flex-wrap gap-4"
      >
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab)}
              className={`w-[168px] rounded-full border py-1.5 text-base transition-colors ${
                active
                  ? "border-[#002F67] bg-[#002F67] font-medium text-[#EFF6FF]"
                  : "border-[#315888] bg-white text-[#315888] hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
