// src/pages/crew/replacements/ReplacementCreate.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import ReplacementForm from "../../../components/crew/forms/ReplacementForm";

export default function ReplacementCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSave = (formData) => {
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

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <ReplacementForm
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
        crewId={id}
      />
    </div>
  );
}