// src/pages/crew/experiences/ExperienceList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

export default function ExperienceList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Experiences,
          rows: DEMO_ROWS.Experiences || [],
        }}
        tabName="Experiences"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/experience/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete experience:", rowId);
        }}
      />
    </div>
  );
}
