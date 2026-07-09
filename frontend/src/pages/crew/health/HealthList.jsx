// src/pages/crew/health/HealthList.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { Trash2, MoreHorizontal, CheckSquare, Square } from "lucide-react";

// ===== DATA =====
const HEALTH_DATA = [
  {
    id: "01",
    date: "23-07-2024",
    size: "170cm / 65kg",
    sight: "1.0 / 1.0",
    hearing: "Normal / Normal",
    blood: '"O"',
    decision: "Normal",
  },
];

const COLUMNS = [
  "No",
  "Date",
  "Size (H/W)",
  "Sight(L/R)",
  "Hearing(L/R)",
  "Blood",
  "Decision",
];

export default function HealthList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [checked, setChecked] = useState(HEALTH_DATA.map(() => true));

  const allChecked = checked.length > 0 && checked.every(Boolean);

  const toggleAll = () => {
    setChecked((prev) => prev.map(() => !allChecked));
  };

  const toggleRow = (idx) => {
    setChecked((prev) => prev.map((c, i) => (i === idx ? !c : c)));
  };

  const handleAddNew = () => {
    navigate(`/crew/${id}/health/new`);
  };

  return (
    <div className="p-6">
      <div className="w-full border border-[#E5E7EB] rounded-md overflow-hidden bg-white">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FBFDFF]">
          <div>
            <h2 className="text-[#3C5065] text-[17px] font-medium leading-tight">
              {t("health") || "Health"}
            </h2>
            <p className="text-[#3C5065] text-xs mt-0.5">
              {HEALTH_DATA.length}{" "}
              {HEALTH_DATA.length === 1 ? "record" : "records"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddNew}
              className="text-sm text-[#002F67] hover:text-[#00397e] font-medium"
            >
              + {t("add_new") || "Add New"}
            </button>
            <button className="flex items-center gap-2 text-[#FE0001] text-sm hover:opacity-80 transition-opacity">
              <Trash2 className="w-4 h-4" />
              {t("delete") || "Delete"}
            </button>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#EFF6FF] border-b border-[#E5E7EB]">
                <th className="py-4 px-4 w-12">
                  <button
                    onClick={toggleAll}
                    aria-label="Select all rows"
                    className="text-[#171A1F]"
                  >
                    {allChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#002F67]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#171A1F]" />
                    )}
                  </button>
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="py-4 px-4 text-sm font-medium text-[#000000] whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HEALTH_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#E5E7EB] last:border-0 bg-white hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleRow(idx)}
                      aria-label={`Select row ${idx + 1}`}
                      className="text-[#3C5065]"
                    >
                      {checked[idx] ? (
                        <CheckSquare className="w-4 h-4 text-[#3C5065]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#3C5065]" />
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">{row.id}</td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.size}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.sight}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.hearing}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.blood}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.decision}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      aria-label="Row actions"
                      className="text-[#3C5065] hover:text-[#002F67] transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
