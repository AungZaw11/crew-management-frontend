// src/features/family/components/FamilyList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";

// ===== MOCK DATA =====
const MOCK_FAMILIES = [
  {
    id: 1,
    no: "01",
    name: "Mg Mg",
    relation: "Brother",
    birth: "1999-08-09",
    phone: "+95 999 888 777",
    address: "Yangon, Myanmar",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    name: "Daw Mya Mya",
    relation: "Mother",
    birth: "1970-05-15",
    phone: "+95 999 888 778",
    address: "Mandalay, Myanmar",
    remarks: "Living with family",
  },
  {
    id: 3,
    no: "03",
    name: "U Maung Maung",
    relation: "Father",
    birth: "1968-10-20",
    phone: "+95 999 888 779",
    address: "Yangon, Myanmar",
    remarks: "-",
  },
];

export default function FamilyList({
  families = [],
  crewId,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterRelation, setFilterRelation] = useState("all");

  const displayData = families.length > 0 ? families : MOCK_FAMILIES;

  const filteredData = filterRelation === "all" 
    ? displayData 
    : displayData.filter(item => item.relation === filterRelation);

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "name", label: "Name" },
    { 
      key: "relation", 
      label: "Relation",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Father" 
            ? "bg-blue-100 text-blue-700" 
            : value === "Mother"
            ? "bg-pink-100 text-pink-700"
            : value === "Spouse"
            ? "bg-purple-100 text-purple-700"
            : value === "Brother"
            ? "bg-green-100 text-green-700"
            : value === "Sister"
            ? "bg-orange-100 text-orange-700"
            : "bg-gray-100 text-gray-700"
        }`}>
          {value || "-"}
        </span>
      )
    },
    { key: "birth", label: "Birth" },
    { key: "phone", label: "Phone" },
    { key: "remarks", label: "Remarks" },
  ];

  const filterOptions = [
    { value: "all", label: "All Relations" },
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Spouse", label: "Spouse" },
    { value: "Brother", label: "Brother" },
    { value: "Sister", label: "Sister" },
    { value: "Son", label: "Son" },
    { value: "Daughter", label: "Daughter" },
    { value: "Other", label: "Other" },
  ];

  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => {
          navigate(`/crew/${crewId}/family/${item.id}`);
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
        emptyMessage={t("no_family_members") || "No family members found"}
        onRowClick={(item) => {
          navigate(`/crew/${crewId}/family/${item.id}`);
        }}
        filterOptions={filterOptions}
        filterValue={filterRelation}
        onFilterChange={setFilterRelation}
        filterLabel={t("relation") || "Relation"}
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