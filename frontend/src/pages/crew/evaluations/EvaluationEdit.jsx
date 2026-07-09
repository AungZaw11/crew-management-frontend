// src/pages/crew/evaluations/EvaluationEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useCrew } from "../../../context/CrewContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import EvaluationForm from "../../../components/crew/forms/EvaluationForm";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function EvaluationEdit() {
  const { id, itemId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getCrewById } = useCrew();
  const [crewMember, setCrewMember] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const crew = await getCrewById(id);
      if (crew) {
        setCrewMember(crew);
        // Find evaluation by id
        const evaluation = crew.evaluations?.find((e) => e.id === itemId);
        if (evaluation) {
          setFormData(evaluation);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [id, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Updating evaluation:", formData);
      navigate(`/crew/${id}`);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  if (loading) return <LoadingSpinner />;

  const crewLabel = crewMember
    ? `${crewMember.name_kor || ""} [${crewMember.crew_code || ""}] - ${crewMember.rank || ""} - ${crewMember.vessel || ""}`
    : t("edit_evaluation") || "Edit Evaluation";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={false}
      />

      <EvaluationForm
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="edit"
        crewId={id}
      />
    </div>
  );
}
