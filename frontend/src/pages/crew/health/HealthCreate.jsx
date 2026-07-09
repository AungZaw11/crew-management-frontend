// src/pages/crew/health/HealthCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import HealthForm from "../../../components/crew/forms/HealthForm";

export default function HealthCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    date: "",
    size: "",
    sight: "",
    hearing: "",
    blood: "",
    decision: "",
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
      console.log("Creating health record:", formData);
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

  const crewLabel = t("add_health") || "Add Health Record";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true}
      />

      <HealthForm
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
      />
    </div>
  );
}
