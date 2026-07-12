// src/features/health/components/MedicalCheckupList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";
import { deleteMedicalCheckup } from "../services/healthSlice";
import toastHelper from "../../../utils/toastHelper";

const MOCK_CHECKUPS = [
  {
    id: 1,
    no: "01",
    date: "2024-07-23",
    size: "170cm / 65kg",
    sight: "1.0 / 1.0",
    hearing: "Normal / Normal",
    blood: "O",
    decision: "Normal",
  },
  {
    id: 2,
    no: "02",
    date: "2024-06-15",
    size: "168cm / 62kg",
    sight: "0.8 / 0.9",
    hearing: "Normal / Normal",
    blood: "A",
    decision: "Normal",
  },
];

export default function MedicalCheckupList({ checkups = [], crewId, isLoading = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);

  const displayData = checkups.length > 0 ? checkups : MOCK_CHECKUPS;

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        await dispatch(deleteMedicalCheckup(id)).unwrap();
        toastHelper.success("Deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "date", label: "Date" },
    { key: "size", label: "Size (H/W)" },
    { key: "sight", label: "Sight (L/R)" },
    { key: "hearing", label: "Hearing (L/R)" },
    { key: "blood", label: "Blood" },
    { 
      key: "decision", 
      label: "Decision",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Normal" 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {value || "-"}
        </span>
      )
    },
  ];

  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => navigate(`/crew/${crewId}/health/medical-checkup/${item.id}`)}
        onEdit={() => navigate(`/crew/${crewId}/health/medical-checkup/${item.id}/edit`)}
        onDelete={() => handleDelete(item.id)}
      />
    ),
  };

  return (
    <Table
      columns={columns}
      data={displayData}
      actions={actions}
      isLoading={isLoading}
      emptyMessage="No medical checkups found"
      showCheckbox={true}
      selectedIds={selectedIds}
      onSelectAll={() => {}}
      onSelectRow={(id) => {}}
    />
  );
}