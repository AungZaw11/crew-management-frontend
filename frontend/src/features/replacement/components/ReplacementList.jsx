// src/features/replacement/components/ReplacementList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";
import { ArrowRight } from "lucide-react";

// ===== MOCK DATA =====
const MOCK_REPLACEMENTS = [
  {
    id: 1,
    no: "01",
    division: "Sign On",
    content: "New Joining",
    ship: "Sun Rio",
    rank: "Chief Officer",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    place: "Yangon",
    status: "Active",
  },
  {
    id: 2,
    no: "02",
    division: "Sign Off",
    content: "Transfer",
    ship: "Woori Sun",
    rank: "Engineer",
    boardingDate: "2025-05-07",
    leavingDate: "2028-05-02",
    place: "Singapore",
    status: "Pending",
  },
  {
    id: 3,
    no: "03",
    division: "Sign On",
    content: "Re-Joining",
    ship: "HS Glory",
    rank: "2nd Officer",
    boardingDate: "2026-06-01",
    leavingDate: "2028-06-01",
    place: "Busan",
    status: "Active",
  },
];

export default function ReplacementList({
  replacements = [],
  crewId,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
  onDeploy, 
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterDivision, setFilterDivision] = useState("all");

  const displayData = replacements.length > 0 ? replacements : MOCK_REPLACEMENTS;

  const filteredData = filterDivision === "all" 
    ? displayData 
    : displayData.filter(item => item.division === filterDivision);

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { 
      key: "division", 
      label: "Division",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Sign On" 
            ? "bg-green-100 text-green-700" 
            : "bg-orange-100 text-orange-700"
        }`}>
          {value || "-"}
        </span>
      )
    },
    { key: "content", label: "Content" },
    { key: "ship", label: "Ship" },
    { key: "rank", label: "Rank" },
    { key: "boardingDate", label: "Boarding Date" },
    { key: "leavingDate", label: "Leaving Date" },
    { key: "place", label: "Place" },
    { 
      key: "status", 
      label: "Status",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Active" 
            ? "bg-green-100 text-green-700" 
            : value === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700"
        }`}>
          {value || "-"}
        </span>
      )
    },
  ];

  const filterOptions = [
    { value: "all", label: "All Division" },
    { value: "Sign On", label: "Sign On" },
    { value: "Sign Off", label: "Sign Off" },
  ];

  const actions = {
    render: (item) => (
      <div className="flex items-center justify-center gap-1">
        <TableActions
          item={item}
          onView={() => {
            navigate(`/crew/${crewId}/replacement/${item.id}`);
          }}
          onEdit={() => onEdit?.(item.id)}
          onDelete={() => onDelete?.(item.id)}
        />
        {onDeploy && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeploy(item);
            }}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title={t("deploy") || "Deploy to Appointment"}
          >
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    ),
  };

  const handleDeleteSelected = async (ids) => {
    if (window.confirm(`Delete ${ids.length} selected items?`)) {
      try {
        for (const id of ids) {
          await onDelete?.(id);
        }
        setSelectedIds([]);
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
        <span className="text-sm text-blue-700">
          {t("deployment_info") || "Click the arrow button (→) to deploy a replacement to Appointment"}
        </span>
        <span className="text-xs text-blue-600 font-medium">
          {filteredData.length} {t("items") || "items"}
        </span>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        actions={actions}
        isLoading={isLoading}
        emptyMessage={t("no_replacements") || "No replacements found"}
        onRowClick={(item) => {
          navigate(`/crew/${crewId}/replacement/${item.id}`);
        }}
        filterOptions={filterOptions}
        filterValue={filterDivision}
        onFilterChange={setFilterDivision}
        filterLabel={t("division") || "Division"}
        showCheckbox={true}
        selectedIds={selectedIds}
        onSelectAll={() => {
          if (selectedIds.length === filteredData.length) {
            setSelectedIds([]);
          } else {
            setSelectedIds(filteredData.map(item => item.id));
          }
        }}
        onSelectRow={(id) => {
          setSelectedIds(prev =>
            prev.includes(id)
              ? prev.filter(i => i !== id)
              : [...prev, id]
          );
        }}
        onDeleteSelected={handleDeleteSelected}
      />
    </div>
  );
}