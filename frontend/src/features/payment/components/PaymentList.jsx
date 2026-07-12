// src/features/payment/components/PaymentList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";

// ===== MOCK DATA =====
const MOCK_PAYMENTS = [
  {
    id: 1,
    no: "01",
    bankName: "CB Bank",
    accountNumber: "xxxx xxxx xxxx 1234",
    accountHolder: "U Kyaw Kyaw",
    relation: "Father",
    amount: 1500000,
    paymentDate: "2026-05-02",
    remarks: "Monthly salary",
    status: "Paid",
  },
  {
    id: 2,
    no: "02",
    bankName: "KBZ Bank",
    accountNumber: "xxxx xxxx xxxx 5678",
    accountHolder: "Daw Mya Mya",
    relation: "Mother",
    amount: 1200000,
    paymentDate: "2026-05-01",
    remarks: "Monthly salary",
    status: "Paid",
  },
  {
    id: 3,
    no: "03",
    bankName: "AYA Bank",
    accountNumber: "xxxx xxxx xxxx 9012",
    accountHolder: "U Maung Maung",
    relation: "Spouse",
    amount: 2000000,
    paymentDate: "2026-04-30",
    remarks: "Bonus payment",
    status: "Pending",
  },
];

export default function PaymentList({
  payments = [],
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

  const displayData = payments.length > 0 ? payments : MOCK_PAYMENTS;

  const filteredData = filterStatus === "all" 
    ? displayData 
    : displayData.filter(item => item.status === filterStatus);

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "bankName", label: "Bank Name" },
    { key: "accountNumber", label: "Account Number" },
    { key: "accountHolder", label: "Account Holder" },
    { key: "relation", label: "Relation" },
    { 
      key: "amount", 
      label: "Amount",
      render: (value) => (
        <span className="font-medium text-gray-800">
          {value ? `${value.toLocaleString()} MMK` : "-"}
        </span>
      )
    },
    
  ];

  const filterOptions = [
    { value: "all", label: "All Status" },
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => {
          navigate(`/crew/${crewId}/payment/${item.id}`);
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
        emptyMessage={t("no_payments") || "No payments found"}
        onRowClick={(item) => {
          navigate(`/crew/${crewId}/payment/${item.id}`);
        }}
        filterOptions={filterOptions}
        filterValue={filterStatus}
        onFilterChange={setFilterStatus}
        filterLabel={t("status") || "Status"}
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