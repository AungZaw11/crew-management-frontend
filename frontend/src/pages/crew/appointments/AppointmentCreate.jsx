// src/pages/crew/appointments/AppointmentCreate.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import AppointmentForm from "../../../components/crew/forms/AppointmentForm";

export default function AppointmentCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSave = (formData) => {
    console.log("Creating appointment:", formData);
    navigate(`/crew/${id}`);
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  const crewLabel = t("new_appointment") || "New Appointment";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true}
      />

      <AppointmentForm
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
        crewId={id}
      />
    </div>
  );
}
