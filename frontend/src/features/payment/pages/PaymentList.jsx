// src/pages/crew/payments/PaymentList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

export default function PaymentList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Payment,
          rows: DEMO_ROWS.Payment || [],
        }}
        tabName="Payment"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/payment/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete payment:", rowId);
        }}
      />
    </div>
  );
}
