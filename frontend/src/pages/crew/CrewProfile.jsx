// src/pages/crew/CrewProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCrew } from "../../context/CrewContext";
import { useLanguage } from "../../context/LanguageContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { SubHeader } from "../../components/crew/SubHeader";
import { TabPills, TAB_KEYS } from "../../components/crew/TabPills"; // ← TAB_KEYS ကို import လုပ်ပါ
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
  const { getCrewById, createCrew, updateCrew } = useCrew();
  const [crewMember, setCrewMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]); 

  const isNewMode = id === "new";
  const isEditing = isNewMode || true;

  const emptyCrew = {
    crew_code: "",
    rank: "",
    hire_date: "",
    name_kor: "",
    name_eng: "",
    name_chinese: "",
    address: "",
    address_kor: "",
    phone: "",
    mobile: "",
    email: "",
    emergency_1: "",
    emergency_2: "",
    resident_id: "",
    birth_date: "",
    nationality: "",
    religion: "",
    education_university: "",
    education_school: "",
    vessel: "Sun Rio",
    waist: "",
    safety_shoes: "",
    garments: "",
    drinking: "",
    smoking: "",
    monthly_position: "",
    chemical: "",
    tanker: "",
    watch_office: "",
    note: "",
    mariners_license: "",
    passport: "",
    telecom_license: "",
    physical_exam: "",
    seaman_handbook: "",
    contract_period: "",
  };

  useEffect(() => {
    const loadCrew = async () => {
      if (isNewMode) {
        setCrewMember(emptyCrew);
        setLoading(false);
        return;
      }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (isNewMode) {
        await createCrew(crewMember);
      } else {
        await updateCrew(id, crewMember);
      }
      navigate("/crew");
    } catch (error) {
      console.error("Failed to save crew:", error);
    }
  };

  const handleCancel = () => {
    navigate("/crew");
  };

  const handleBack = () => {
    navigate("/crew");
  };

  const handleAddNew = () => {
    navigate("/crew/new");
  };

  if (loading) return <LoadingSpinner />;
  if (!crewMember)
    return <div className="text-center py-10">Crew not found</div>;

  const crewLabel = isNewMode
    ? t("add_new_crew") || "Add New Crew"
    : `${crewMember.name_kor || ""} [${crewMember.crew_code || ""}] - ${crewMember.rank || ""} - ${crewMember.vessel || ""}`;

  const renderTabContent = () => {
    switch (activeTab) {
      case TAB_KEYS[0]: 
        return (
          <PersonalInfoForm
            crewMember={crewMember}
            isEditing={isEditing}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
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
        showAddNew={!isNewMode}
      />

      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 bg-white">{renderTabContent()}</div>
    </div>
  );
}