// src/pages/crew/appointments/AppointmentList.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import DynamicTable from "../../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../../config/tableConfigs";

export default function AppointmentList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <DynamicTable
        config={{
          ...TABLE_CONFIGS.Appointment,
          rows: DEMO_ROWS.Appointment || [],
        }}
        tabName="Appointment"
        crewId={id}
        onAddNew={() => {
          navigate(`/crew/${id}/appointment/new`);
        }}
        onDelete={(rowId) => {
          console.log("Delete appointment:", rowId);
        }}
      />
    </div>
  );
}
