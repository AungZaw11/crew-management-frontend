// src/features/health/components/DiseaseList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";
import { deleteDisease } from "../services/healthSlice";
import toastHelper from "../../../utils/toastHelper";

// Mock Data
const MOCK_DISEASES = [
  {
    id: 1,
    no: "01",
    startDate: "2024-07-23",
    endDate: "2024-07-25",
    illness: "Flu",
    medicine: "Paracetamol 500mg",
    otherMedicine: "Vitamin C, Cough Syrup",
    remarks: "Rest well, drink plenty of fluids",
  },
  {
    id: 2,
    no: "02",
    startDate: "2024-08-01",
    endDate: "2024-08-05",
    illness: "Cold",
    medicine: "Cetirizine",
    otherMedicine: "Vitamin C",
    remarks: "Recovered",
  },
];

export default function DiseaseList({ diseases = [], crewId, isLoading = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);

  const displayData = diseases.length > 0 ? diseases : MOCK_DISEASES;

  // ✅ Delete single
  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        await dispatch(deleteDisease(id)).unwrap();
        toastHelper.success("Deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  // ✅ Delete Selected
  const handleDeleteSelected = async (ids) => {
    if (window.confirm(t("confirm_delete_selected") || "Delete selected items?")) {
      try {
        for (const id of ids) {
          await dispatch(deleteDisease(id)).unwrap();
        }
        toastHelper.success("Selected items deleted!");
        setSelectedIds([]);
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  // ✅ Select All
  const handleSelectAll = () => {
    if (selectedIds.length === displayData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayData.map(item => item.id));
    }
  };

  // ✅ Select Row
  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item.id !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "illness", label: "Illness" },
    { key: "medicine", label: "Medicine" },
    { key: "otherMedicine", label: "Other Medicine" },
    { key: "remarks", label: "Remarks" },
  ];

  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => navigate(`/crew/${crewId}/health/disease/${item.id}`)}
        onEdit={() => navigate(`/crew/${crewId}/health/disease/${item.id}/edit`)}
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
      emptyMessage="No diseases found"
      showCheckbox={true}
      selectedIds={selectedIds}
      onSelectAll={handleSelectAll}
      onSelectRow={handleSelectRow}
      onDeleteSelected={handleDeleteSelected}
    />
  );
}