// src/pages/crew/experiences/ExperienceCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import ExperienceForm from "../../../components/crew/forms/ExperienceForm";

export default function ExperienceCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    company: "",
    ship: "",
    rank: "",
    boardingDate: "",
    leavingDate: "",
    area: "",
    shipType: "",
    boardLeave: "",
    grt: "",
    kw: "",
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
      console.log("Creating experience:", formData);
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

  const crewLabel = t("new_experience") || "New Experience";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true}
      />

      <ExperienceForm
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
