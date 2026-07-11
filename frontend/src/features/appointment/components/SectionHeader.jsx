// src/features/appointment/components/SectionHeader.jsx
import React from "react";
import FieldLabel from "./FieldLabel";  

export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
      <h2 className="text-[17px] font-medium text-[#3C5065]">{title}</h2>
    </div>
  );
}