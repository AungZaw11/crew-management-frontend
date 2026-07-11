// src/pages/crew/qualifications/QualificationCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import QualificationForm from "../../../components/crew/forms/QualificationForm";

export default function QualificationCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    certificateName: "",
    expiration: "",
    trainingDate: "",
    expireDate: "",
    licenseNumber: "",
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
      console.log("Creating qualification:", formData);
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

  // Create mode အတွက် SubHeader
  const crewLabel = t("new_qualification") || "New Qualification";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={true} // ← "New Qualification" ပြဖို့
      />

      <QualificationForm
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
      />
    </div>
  );
}
