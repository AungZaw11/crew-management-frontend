// src/pages/crew/accidents/AccidentList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

export default function AccidentList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Accident,
          rows: DEMO_ROWS.Accident || [],
        }}
        tabName="Accident"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/accident/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete accident:", rowId);
        }}
      />
    </div>
  );
}
