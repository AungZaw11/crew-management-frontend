// src/features/health/components/InjuryList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";
import { deleteInjury } from "../services/healthSlice";
import toastHelper from "../../../utils/toastHelper";

const MOCK_INJURIES = [
  {
    id: 1,
    no: "01",
    illness: "-",
    medicalName: "Disease",
    hospital: "Asia Royal",
    treatmentStart: "2024-02-08",
    recoveryDate: "2024-02-12",
    type: "Private",
    expenseWon: "-",
    expenseEx: "-",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    illness: "Fever",
    medicalName: "Infection",
    hospital: "Yangon General",
    treatmentStart: "2024-03-10",
    recoveryDate: "2024-03-15",
    type: "Public",
    expenseWon: "50000",
    expenseEx: "20000",
    remarks: "Recovered",
  },
];

export default function InjuryList({ injuries = [], crewId, isLoading = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);

  const displayData = injuries.length > 0 ? injuries : MOCK_INJURIES;

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        await dispatch(deleteInjury(id)).unwrap();
        toastHelper.success("Deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "illness", label: "Illness" },
    { key: "medicalName", label: "Medical Name" },
    { key: "hospital", label: "Hospital" },
    { key: "treatmentStart", label: "Treatment Start" },
    { key: "recoveryDate", label: "Recovery Date" },
    { key: "type", label: "Public/Private" },
    { key: "expenseWon", label: "Expense_won" },
    { key: "expenseEx", label: "Expense_ex" },
    { key: "remarks", label: "Remarks" },
  ];

  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => navigate(`/crew/${crewId}/health/injury/${item.id}`)}
        onEdit={() => navigate(`/crew/${crewId}/health/injury/${item.id}/edit`)}
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
      emptyMessage="No injuries found"
      showCheckbox={true}
      selectedIds={selectedIds}
      onSelectAll={() => {}}
      onSelectRow={(id) => {}}
    />
  );
}