// src/features/qualification/components/QualificationList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";

const MOCK_QUALIFICATIONS = [
  {
    id: 1,
    no: "01",
    expiration: "Date Limit",
    certificateName: "Deck",
    trainingDate: "2026-05-02",
    expireDate: "2028-05-02",
    licenseNumber: "Major Requirements",
    remarks: "Passport",
    status: "Active",

  },
  {
    id: 2,
    no: "02",
    expiration: "Date Limit",
    certificateName: "Deck",
    trainingDate: "2026-05-02",
    expireDate: "2028-05-02",
    licenseNumber: "Major Requirements",
    remarks: "Passport",
    status: "Active",
    
  },
  // ... more data
];

export default function QualificationList({
  qualifications = [],
  crewId,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const displayData = qualifications.length > 0 ? qualifications : MOCK_QUALIFICATIONS;

  const filteredData = filterStatus === "all" 
    ? displayData 
    : displayData.filter(item => item.status === filterStatus);

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { 
      key: "expiration", 
      label: "Expiration",
      render: (value, item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === "Active" 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {value || "Active"}
        </span>
      )
    },
    { key: "certificateName", label: "Certificate Name" },
    { key: "trainingDate", label: "Training Date" },
    { key: "expireDate", label: "Expire Date" },
    { key: "licenseNumber", label: "License Number" },
    { key: "remarks", label: "Remarks" },
  ];

  const filterOptions = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Expired", label: "Expired" },
    { value: "Pending", label: "Pending" },
  ];

   // src/features/qualification/components/QualificationList.jsx
const actions = {
  render: (item) => (
    <TableActions
      item={item}
      onView={() => {
        console.log("🔹 View clicked for item:", item.id);
        if (typeof onView === 'function') {
          onView(item.id);
        } else {
          navigate(`/crew/${crewId}/qualification/${item.id}`);
        }
      }}
      onEdit={() => {
        console.log("🔹 Edit clicked for item:", item.id);
        if (typeof onEdit === 'function') {
          onEdit(item.id);
        } else {
          navigate(`/crew/${crewId}/qualification/${item.id}/edit`);
        }
      }}
      onDelete={() => {
        console.log("🔹 Delete clicked for item:", item.id);
        if (typeof onDelete === 'function') {
          onDelete(item.id);
        }
      }}
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
        emptyMessage={t("no_qualifications") || "No qualifications found"}
        onRowClick={(item) => {
          // ✅ Row ကိုနှိပ်ရင် Detail Page ကိုသွားမယ်
          navigate(`/crew/${crewId}/qualification/${item.id}`);
        }}
        filterOptions={filterOptions}
        filterValue={filterStatus}
        onFilterChange={setFilterStatus}
        filterLabel={t("status") || "Status"}
        // ✅ Checkbox & Delete Props
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