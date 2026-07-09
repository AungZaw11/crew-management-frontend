// src/pages/crew/CrewCreate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrew } from "../../context/CrewContext";
import { useLanguage } from "../../context/LanguageContext";
import { SubHeader } from "../../components/crew/SubHeader";
import { TabPills, TAB_KEYS } from "../../components/crew/TabPills";
import PersonalInfoForm from "../../components/crew/PersonalInfoForm";
import { QualificationCreateForm } from "../../components/crew/QualificationCreateForm";
import AppointmentForm from "./forms/AppointmentForm"; 
import ReplacementForm from "./forms/ReplacementForm";
import PaymentForm from "./forms/PaymentForm";
import FamilyForm from "./forms/FamilyForm";
import ExperienceForm from "./forms/ExperienceForm";
import AccidentForm from "./forms/AccidentForm";
import EvaluationForm from "./forms/EvaluationForm";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewCreate() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { createCrew } = useCrew();
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);
  const [crewMember, setCrewMember] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await createCrew(crewMember);
      navigate("/crew");
    } catch (error) {
      console.error("Failed to create crew:", error);
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

  const handleQualificationSave = () => {
    console.log("✅ Qualification saved!");
  };

  const handleQualificationCancel = () => {
    console.log("❌ Qualification cancelled!");
  };

  const crewLabel = t("add_new_crew") || "Add New Crew";

  // ===== RENDER TAB CONTENT =====
  const renderContent = () => {
    switch (activeTab) {
      case TAB_KEYS[0]: // personal_info
        return (
          <PersonalInfoForm
            crewMember={crewMember}
            isEditing={true}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );

      case TAB_KEYS[1]: // qualifications
        return (
          <QualificationCreateForm
            onSave={handleQualificationSave}
            onCancel={handleQualificationCancel}
          />
        );

      case TAB_KEYS[2]: // appointment
        return <AppointmentForm />;
      
      case TAB_KEYS[3]: // replacement
        return <ReplacementForm />;

      case TAB_KEYS[4]: // payment
        return <PaymentForm />;

      case TAB_KEYS[5]: // family
        return <FamilyForm />;

      case TAB_KEYS[8]: // experience
        return <ExperienceForm />;
      
      case TAB_KEYS[9]: // evaluation
        return <EvaluationForm />;

      case TAB_KEYS[11]: // accident
        return <AccidentForm />;

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
        showAddNew={false}
        isNew={true}
      />

      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 bg-white">{renderContent()}</div>
    </div>
  );
}
