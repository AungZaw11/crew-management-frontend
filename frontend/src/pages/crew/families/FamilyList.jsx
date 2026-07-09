// src/pages/crew/families/FamilyList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

export default function FamilyList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Family,
          rows: DEMO_ROWS.Family || [],
        }}
        tabName="Family"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/family/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete family:", rowId);
        }}
      />
    </div>
  );
}
