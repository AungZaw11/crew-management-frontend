// src/pages/crew/accidents/AccidentCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import AccidentForm from "../../../components/crew/forms/AccidentForm";

export default function AccidentCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    shipName: "",
    rank: "",
    accidentReason: "",
    reUse: "",
    remarks: "",
    accidentDate: "",
    accidentType: "",
    accidentCost: "",
    etc: "",
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
      console.log("Creating accident:", formData);
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

  const crewLabel = t("add_accident") || "Add Accident";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true}
      />

      <AccidentForm
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
