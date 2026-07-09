// src/pages/crew/families/FamilyEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useCrew } from "../../../context/CrewContext";
import { SubHeader } from "../../../components/crew/SubHeader";
import FamilyForm from "../../../components/crew/forms/FamilyForm";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function FamilyEdit() {
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
        // Find family by id
        const family = crew.families?.find((f) => f.id === itemId);
        if (family) {
          setFormData(family);
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
      console.log("Updating family member:", formData);
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
    : t("edit_family_member") || "Edit Family Member";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
        isNew={false}
      />

      <FamilyForm
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
