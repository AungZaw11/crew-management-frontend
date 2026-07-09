// src/pages/crew/injuries/InjuryCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import InjuryForm from "../../../components/crew/forms/InjuryForm";

export default function InjuryCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    illness: "",
    medicalName: "",
    hospital: "",
    startDate: "",
    recoveryDate: "",
    type: "",
    expenseWon: "",
    expenseEx: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Creating injury:", formData);
      navigate(`/crew/${id}`);
    } catch (error) {
      console.error("Failed to create:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  const crewLabel = t("add_injury") || "Add Injury";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true}
      />

      <InjuryForm
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
      />
    </div>
  );
}
