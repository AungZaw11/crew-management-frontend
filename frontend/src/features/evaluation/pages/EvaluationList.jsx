// src/pages/crew/evaluations/EvaluationList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

export default function EvaluationList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Evaluation,
          rows: DEMO_ROWS.Evaluation || [],
        }}
        tabName="Evaluation"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/evaluation/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete evaluation:", rowId);
        }}
      />
    </div>
  );
}
