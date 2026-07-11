// src/pages/dashboard/Overview.jsx
import React, { useState, useEffect } from "react";
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
  Users,
  Anchor,
  UserCheck,
  AlertCircle,
  Ship,
  Clock,
  UserX,
} from "lucide-react";
import DonutCard from "../../common/components/DonutCard";
import Pagination from "../../common/components/Pagination";
import { Link } from "react-router-dom";
import { useLanguage } from "../../common/hooks/LanguageContext";

// ===== STATS DATA =====
const STATS_DATA = [
  {
    id: "certificate",
    title: "Certificate",
    value: 96,
    total: 1200,
    signOn: 800,
    signOff: 400,
    color: "bg-blue-50",
    icon: <UserCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "contract",
    title: "Contract",
    value: 55,
    total: 30,
    signOn: 800,
    signOff: 400,
    color: "bg-green-50",
    icon: <Anchor className="w-6 h-6 text-green-600" />,
  },
  {
    id: "ppt",
    title: "PPT",
    value: 124,
    total: 100,
    signOn: 800,
    signOff: 400,
    color: "bg-purple-50",
    icon: <Ship className="w-6 h-6 text-purple-600" />,
  },
  {
    id: "vessel",
    title: "Vessel",
    value: 24,
    total: 14,
    signOn: 800,
    signOff: 400,
    color: "bg-yellow-50",
    icon: <Ship className="w-6 h-6 text-yellow-600" />,
  },
  {
    id: "active",
    title: "Active",
    value: 10,
    total: 10,
    signOn: 800,
    signOff: 400,
    color: "bg-emerald-50",
    icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
  },
  {
    id: "inactive",
    title: "InActive",
    value: 10,
    total: 10,
    signOn: 800,
    signOff: 400,
    color: "bg-red-50",
    icon: <UserX className="w-6 h-6 text-red-600" />,
  },
];

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

const PPT_DATA = [
  { label: "Expire", value: 30, color: "#FE0001" },
  { label: "30 Days", value: 45, color: "#FFB44F" },
  { label: "60 Days", value: 25, color: "#10B981" },
  { label: "90 Days", value: 124, color: "#4F81BD" },
];

// ===== CREW LIST DATA =====
const CREW_DATA = [
  {
    id: "01",
    name: "Mg Mg",
    vessel: "Sun Rio",
    rank: "Captain",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "92% Capacity",
    remaining: "30 Days",
  },
  {
    id: "02",
    name: "Aung Aung",
    vessel: "Sun Rio",
    rank: "Pilot",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "45% Capacity",
    remaining: "30 Days",
  },
  {
    id: "03",
    name: "Ko Htoo",
    vessel: "Sun Rio",
    rank: "Captain",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "100% Capacity",
    remaining: "30 Days",
  },
  {
    id: "04",
    name: "Hla Hla",
    vessel: "Sun Rio",
    rank: "Pilot",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "12% Capacity",
    remaining: "30 Days",
  },
  {
    id: "05",
    name: "Ye Htet",
    vessel: "Sun Rio",
    rank: "Captain",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "12% Capacity",
    remaining: "30 Days",
  },
  {
    id: "06",
    name: "Lin Lin",
    vessel: "Sun Rio",
    rank: "Pilot",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "92% Capacity",
    remaining: "30 Days",
  },
  {
    id: "07",
    name: "John K",
    vessel: "Sun Rio",
    rank: "Captain",
    education: "Certificate of Endorsement (GMDSS)",
    expireDate: "45% Capacity",
    remaining: "30 Days",
  },
];

export default function Overview() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalItems = CREW_DATA.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return CREW_DATA.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ===== EXPORT TO EXCEL =====
  const handleExportToExcel = () => {
    const exportData = CREW_DATA.map((row) => ({
      No: row.id,
      "Crew Name": row.name,
      Vessel: row.vessel,
      Rank: row.rank,
      "Education Name": row.education,
      "Expire Date": row.expireDate,
      "Remaining Date": row.remaining,
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-main">
          {t("dashboard_overview") || "Dashboard Overview"}
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-text-main hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" /> {t("export") || "Export"}
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-6 py-2 bg-[#002F67] rounded-lg text-sm text-white hover:bg-[#00397e] transition-colors"
          >
            <Plus className="w-4 h-4" /> {t("add_crew") || "Add Crew"}
          </button>
        </div>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STATS_DATA.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-text-light font-medium">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-text-main">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-text-light">
                  Total: {stat.total}
                </p>
                <p className="text-[10px] text-green-600">On: {stat.signOn}</p>
                <p className="text-[10px] text-red-500">Off: {stat.signOff}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== DONUT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DonutCard
          title={t("certificate") || "Certificate"}
          total={393}
          data={CERT_DATA}
          delay={0.1}
        />
        <DonutCard title="PPT" total={393} data={PPT_DATA} delay={0.2} />
        <DonutCard
          title={t("contract") || "Contract"}
          total={393}
          data={CONTRACT_DATA}
          delay={0.3}
        />
      </div>

      {/* ===== CREW LIST TABLE ===== */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-semibold text-text-main">
              {t("crew_list") || "Crew List"}
            </h3>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-text-main">
                {t("vessel") || "Vessel"}
              </span>
              <ChevronDown className="w-4 h-4 text-text-light" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-text-main">
                {t("rank") || "Rank"}
              </span>
              <ChevronDown className="w-4 h-4 text-text-light" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-text-light" />
              <span className="text-xs text-text-main">
                {t("include_period_contract") || "Include Period Contract"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg bg-[#002F67] text-white">
                <LayoutList className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg border border-gray-200 text-text-main hover:bg-gray-50">
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-sm font-semibold text-text-main">
                <th className="px-4 py-3 whitespace-nowrap">No</th>
                <th className="px-4 py-3 whitespace-nowrap">Crew Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Vessel</th>
                <th className="px-4 py-3 whitespace-nowrap">Rank</th>
                <th className="px-4 py-3 whitespace-nowrap">Education Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Expire Date</th>
                <th className="px-4 py-3 whitespace-nowrap">Remaining Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-text-dark">{row.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-text-dark">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-dark">
                    {row.vessel}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-dark">
                    {row.rank}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-dark max-w-[200px] truncate">
                    {row.education}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-dark">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                      {row.expireDate}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#FFB44F]">
                    {row.remaining}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-text-light">
            {t("showing") || "Showing"} {currentData.length} {t("of") || "of"}{" "}
            {totalItems} {t("entries") || "entries"}
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
