// src/pages/crew/CrewProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCrew } from "../../context/CrewContext";
import { useLanguage } from "../../context/LanguageContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { SubHeader } from "../../components/crew/SubHeader";
import { TabPills, TABS } from "../../components/crew/TabPills";
import PersonalInfoForm from "../../components/crew/PersonalInfoForm";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getCrewById } = useCrew();
  const [crewMember, setCrewMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal Info");

  useEffect(() => {
    const loadCrew = async () => {
      if (id) {
        const data = await getCrewById(id);
        if (data) {
          setCrewMember(data);
        } else {
          navigate("/crew");
        }
      }
      setLoading(false);
    };
    loadCrew();
  }, [id]);

  const handleBack = () => {
    navigate("/crew");
  };

  const handleAddNew = () => {
    navigate("/crew/new");
  };

  if (loading) return <LoadingSpinner />;
  if (!crewMember)
    return <div className="text-center py-10">Crew not found</div>;

  const crewLabel = `${crewMember.name_kor || ""} [${crewMember.crew_code || ""}] - ${crewMember.rank || ""} - ${crewMember.vessel || ""}`;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <PersonalInfoForm crewMember={crewMember} isEditing={false} />;
      default:
        return <OtherTab tabName={activeTab} />;
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={handleAddNew}
        crewLabel={crewLabel}
        showAddNew={true}
      />

      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 bg-white">{renderTabContent()}</div>
    </div>
  );
}
