// src/pages/crew/replacements/ReplacementCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import ReplacementForm from "../../../components/crew/forms/ReplacementForm";

export default function ReplacementCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    division: "",
    content: "",
    ship: "",
    rank: "",
    date: "",
    place: "",
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
      console.log("Creating replacement:", formData);
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

  const crewLabel = t("new_replacement") || "New Replacement";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true}
      />

      <ReplacementForm
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
        crewId={id}
      />
    </div>
  );
}
