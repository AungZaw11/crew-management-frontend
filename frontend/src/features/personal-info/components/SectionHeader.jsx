// src/features/personal-info/components/SectionHeader.jsx
import React from "react";

export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center bg-[#EFF6FF] px-6 py-2.5">
      <h2 className="text-[17px] font-medium text-[#3C5065]">{title}</h2>
    </div>
  );
}