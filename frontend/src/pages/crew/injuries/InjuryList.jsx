// src/pages/crew/injuries/InjuryList.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { Trash2, MoreHorizontal, CheckSquare, Square } from "lucide-react";

// ===== DATA =====
const INJURY_DATA = [
  {
    id: "01",
    illness: "-",
    medicalName: "Disease",
    hospital: "Asia Royal",
    startDate: "08-02-24",
    recoveryDate: "12-02-24",
    type: "Private",
    expenseWon: "-",
    expenseEx: "-",
    remarks: "-",
  },
  {
    id: "02",
    illness: "-",
    medicalName: "Disease",
    hospital: "Asia Royal",
    startDate: "08-02-24",
    recoveryDate: "12-02-24",
    type: "Private",
    expenseWon: "-",
    expenseEx: "-",
    remarks: "-",
  },
  {
    id: "03",
    illness: "-",
    medicalName: "Disease",
    hospital: "Asia Royal",
    startDate: "08-02-24",
    recoveryDate: "12-02-24",
    type: "Private",
    expenseWon: "-",
    expenseEx: "-",
    remarks: "-",
  },
  {
    id: "04",
    illness: "-",
    medicalName: "Disease",
    hospital: "Asia Royal",
    startDate: "08-02-24",
    recoveryDate: "12-02-24",
    type: "Private",
    expenseWon: "-",
    expenseEx: "-",
    remarks: "-",
  },
];

const COLUMNS = [
  "No",
  "Illness",
  "Medical Name",
  "Hospital",
  "Treatment Start Date",
  "Recovery Date",
  "Public/Private",
  "Expense_won",
  "Expense_ex",
  "Remarks",
];

export default function InjuryList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [checked, setChecked] = useState(INJURY_DATA.map(() => true));

  const allChecked = checked.length > 0 && checked.every(Boolean);

  const toggleAll = () => {
    setChecked((prev) => prev.map(() => !allChecked));
  };

  const toggleRow = (idx) => {
    setChecked((prev) => prev.map((c, i) => (i === idx ? !c : c)));
  };

  const handleAddNew = () => {
    navigate(`/crew/${id}/injury/new`);
  };

  return (
    <div className="p-6">
      <div className="w-full border border-[#E5E7EB] rounded-md overflow-hidden bg-white">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FBFDFF]">
          <div>
            <h2 className="text-[#3C5065] text-[17px] font-medium leading-tight">
              {t("injury") || "Injury"}
            </h2>
            <p className="text-[#3C5065] text-xs mt-0.5">
              {INJURY_DATA.length}{" "}
              {INJURY_DATA.length === 1 ? "record" : "records"}
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
          <table className="w-full text-left border-collapse min-w-[900px]">
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
              {INJURY_DATA.map((row, idx) => (
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
                    {row.illness}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.medicalName}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.hospital}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.startDate}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.recoveryDate}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.type}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.expenseWon}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.expenseEx}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#171A1F]">
                    {row.remarks}
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
