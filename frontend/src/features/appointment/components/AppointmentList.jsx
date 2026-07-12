// src/features/appointment/components/AppointmentList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    no: "01",
    division: "Sign On",
    content: "Re-Joining",
    ship: "Sun Rio",
    rank: "2nd Engineer",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "124 days",
    place: "-",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    division: "Sign On",
    content: "Probation",
    ship: "Sun Rio",
    rank: "Pilot",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "180 days",
    place: "-",
    remarks: "-",
  },
  {
    id: 3,
    no: "03",
    division: "Date Limit",
    content: "Deck",
    ship: "Major Requirements",
    rank: "Passport",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "Passport",
    place: "Passport",
    remarks: "Passport",
  },
  {
    id: 4,
    no: "04",
    division: "Date Limit",
    content: "Deck",
    ship: "Major Requirements",
    rank: "Passport",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "Passport",
    place: "Passport",
    remarks: "Passport",
  },
  {
    id: 5,
    no: "05",
    division: "Date Limit",
    content: "Deck",
    ship: "Major Requirements",
    rank: "Passport",
    boardingDate: "2026-05-02",
    leavingDate: "2028-05-02",
    boardingPeriod: "Passport",
    place: "Passport",
    remarks: "Passport",
  },
];

export default function AppointmentList({
  appointments = [],
  crewId,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterDivision, setFilterDivision] = useState("all");

  const displayData = appointments.length > 0 ? appointments : MOCK_APPOINTMENTS;

  const filteredData = filterDivision === "all" 
    ? displayData 
    : displayData.filter(item => item.division === filterDivision);

  // ✅ Column Definitions (UI Design အတိုင်း)
  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "division", label: "Deployment Division" },
    { key: "content", label: "Deployment Content" },
    { key: "ship", label: "Ship's Name" },
    { key: "rank", label: "Rank" },
    { key: "boardingDate", label: "Boarding Date" },
    { key: "leavingDate", label: "Leaving Date" },
    { key: "boardingPeriod", label: "Boarding Period" },
    { key: "place", label: "Place" },
    { key: "remarks", label: "Remarks" },
  ];

  // ✅ Filter Options
  const filterOptions = [
    { value: "all", label: "All Division" },
    { value: "Sign On", label: "Sign On" },
    { value: "Sign Off", label: "Sign Off" },
    { value: "Date Limit", label: "Date Limit" },
  ];

  // ✅ Actions
  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => {
          navigate(`/crew/${crewId}/appointment/${item.id}`);
        }}
        onEdit={() => onEdit?.(item.id)}
        onDelete={() => onDelete?.(item.id)}
      />
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
      <Table
        columns={columns}
        data={filteredData}
        actions={actions}
        isLoading={isLoading}
        emptyMessage={t("no_appointments") || "No appointments found"}
        onRowClick={(item) => {
          navigate(`/crew/${crewId}/appointment/${item.id}`);
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