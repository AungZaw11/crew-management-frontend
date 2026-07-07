// src/pages/dashboard/Overview.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Download,
  Plus,
  ChevronDown,
  Calendar as CalendarIcon,
  LayoutList,
  LayoutGrid,
  CheckSquare,
} from "lucide-react";
import DonutCard from "../../components/ui/DonutCard";
import Pagination from "../../components/ui/Pagination";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const CERT_DATA = [
  { label: "Expire", value: 46, color: "#FE0001" },
  { label: "30 Days", value: 98, color: "#FFB44F" },
  { label: "60 Days", value: 118, color: "#10B981" },
  { label: "90 Days", value: 131, color: "#4F81BD" },
];

const CONTRACT_DATA = [
  { label: "Expire", value: 24, color: "#FE0001" },
  { label: "30 Days", value: 38, color: "#FFB44F" },
  { label: "60 Days", value: 46, color: "#10B981" },
  { label: "90 Days", value: 58, color: "#002F67" },
];

const TABLE_DATA = [
  {
    id: "01",
    vessel: "HS Glory",
    rank: "Deck",
    code: "P006472",
    name: "Tun Tun",
    validity: "Major Requirements",
    division: "Passport",
    type: "2026-02-11",
    remaining: -459,
    note: "CRP",
  },
  {
    id: "02",
    vessel: "HS Glory",
    rank: "Deck",
    code: "P006472",
    name: "Tun Tun",
    validity: "Major Requirements",
    division: "Passport",
    type: "2026-02-11",
    remaining: -459,
    note: "CRP",
  },
  {
    id: "03",
    vessel: "HS Glory",
    rank: "Deck",
    code: "P006472",
    name: "Tun Tun",
    validity: "Major Requirements",
    division: "Passport",
    type: "2026-02-11",
    remaining: -459,
    note: "CRP",
  },
  {
    id: "04",
    vessel: "HS Glory",
    rank: "Deck",
    code: "P006472",
    name: "Tun Tun",
    validity: "Major Requirements",
    division: "Passport",
    type: "2026-02-11",
    remaining: -459,
    note: "CRP",
  },
  {
    id: "05",
    vessel: "HS Glory",
    rank: "Deck",
    code: "P006472",
    name: "Tun Tun",
    validity: "Major Requirements",
    division: "Passport",
    type: "2026-02-11",
    remaining: -459,
    note: "CRP",
  },
  {
    id: "06",
    vessel: "HS Glory",
    rank: "Deck",
    code: "P006472",
    name: "Tun Tun",
    validity: "Major Requirements",
    division: "Passport",
    type: "2026-02-11",
    remaining: -459,
    note: "CRP",
  },
];

export default function Overview() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // ==================== EXPORT TO EXCEL ====================
  const handleExportToExcel = () => {
    const exportData = TABLE_DATA.map((row) => ({
      No: row.id,
      "Boarding Vessel": row.vessel,
      Rank: row.rank,
      "Seaman Code": row.code,
      Name: row.name,
      Validity: row.validity,
      Division: row.division,
      Type: row.type,
      Remaining: row.remaining,
      Note: row.note,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Overview");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Overview_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Row */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in-up">
        <h1 className="text-xl font-medium text-text tracking-wide">
          {t("overview")}
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 border border-brand-muted rounded-[6px] bg-surface text-sm text-text hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" /> {t("export")}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-6 py-2 bg-brand-accent rounded-[6px] text-sm text-brand-light hover:bg-brand-navy transition-colors"
          >
            <Plus className="w-4 h-4" /> {t("add_crew")}
          </button>
        </div>
      </div>

      {/* Donut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DonutCard
          title={t("certificate")}
          total={393}
          data={CERT_DATA}
          delay={0.1}
        />
        <DonutCard title="PPT" total={393} data={CERT_DATA} delay={0.2} />
        <DonutCard
          title={t("contract")}
          total={393}
          data={CONTRACT_DATA}
          delay={0.3}
        />
      </div>

      {/* Table Card */}
      <div className="bg-surface border border-border rounded-[6px] shadow-card overflow-hidden opacity-0 animate-fade-in-up delay-400">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-text tracking-wide">
              {t("vessel_name")}
            </span>
            <ChevronDown className="w-4 h-4 text-text" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-text tracking-wide">{t("rank")}</span>
            <ChevronDown className="w-4 h-4 text-text" />
          </div>
          <div className="flex items-center gap-3 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50">
            <span className="text-xs text-text tracking-wide">
              2026-03-07 - 2026-07-31
            </span>
            <CalendarIcon className="w-4 h-4 text-text" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <CheckSquare className="w-5 h-5 text-text" />
            <span className="text-xs text-text tracking-wide">
              {t("include_period_contract")}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link
              to="/overview"
              className="w-9 h-9 flex items-center justify-center rounded-[5px] bg-text text-surface-off border border-text"
            >
              <LayoutList className="w-4 h-4" />
            </Link>
            <Link
              to="/calendar"
              className="w-9 h-9 flex items-center justify-center rounded-[5px] bg-surface text-text border border-border hover:bg-gray-50 transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-light/64 border-b border-border">
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("no") || "No"}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("boarding_vessel") || "Boarding Vessel"}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("rank")}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("seaman_code") || "Seaman Code"}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("name")}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("validity")}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("division")}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("type")}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("remaining")}
                </th>
                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">
                  {t("note")}
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-border/50 hover:bg-gray-50 transition-colors ${index % 2 === 1 ? "bg-surface-off" : "bg-surface"}`}
                >
                  <td className="py-3 px-4 text-sm text-text-dark">{row.id}</td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.vessel}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.rank}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.code}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark max-w-[120px] truncate">
                    {row.validity}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.division}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.type}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-status-red">
                    {row.remaining}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-dark">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex justify-end">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
