// src/pages/crew/replacements/ReplacementEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../"../../common/hooks/LanguageContext";
import { useCrew } from "../../../context/CrewContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import ReplacementForm from "../../../components/crew/forms/ReplacementForm";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function ReplacementEdit() {
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
        // Find replacement by id
        const replacement = crew.replacements?.find((r) => r.id === itemId);
        if (replacement) {
          setFormData(replacement);
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
      console.log("Updating replacement:", formData);
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
    : t("edit_replacement") || "Edit Replacement";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={false}
      />

      <ReplacementForm
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
