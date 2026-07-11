// src/pages/crew/qualifications/QualificationList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

// ✅ export default ကို ထည့်ပါ
export default function QualificationList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Qualification,
          rows: DEMO_ROWS.Qualification || [],
        }}
        tabName="Qualification"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/qualification/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete qualification:", rowId);
        }}
      />
    </div>
  );
}
