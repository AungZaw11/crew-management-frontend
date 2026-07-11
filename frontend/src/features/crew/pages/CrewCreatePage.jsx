// src/features/crew/pages/CrewCreatePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCrewCreate } from "../hooks/useCrewCreate";

// ✅ Default Import ကိုသုံးပါ
import SubHeader from "../components/SubHeader";
import TabPills, { TAB_KEYS } from "../components/TabPills";

// ... ကျန်တဲ့ Imports
import PersonalInfoForm from "../../personal-info/components/PersonalInfoForm";
import QualificationForm from "../../qualification/components/QualificationForm";
import AppointmentForm from "../../appointment/components/AppointmentForm";
import ReplacementForm from "../../replacement/components/ReplacementForm";
import PaymentForm from "../../payment/components/PaymentForm";
import FamilyForm from "../../family/components/FamilyForm";
import InjuryForm from "../../injury/components/InjuryForm";
import HealthForm from "../../health/components/HealthForm";
import ExperienceForm from "../../experience/components/ExperienceForm";
import EvaluationForm from "../../evaluation/components/EvaluationForm";
import AccidentForm from "../../accident/components/AccidentForm";
import { useLanguage } from "../../../common/hooks/LanguageContext";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewCreatePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const {
    activeTab,
    setActiveTab,
    crewMember,
    errors,
    isLoading,
    avatarPreview,
    avatarFile,
    handleChange,
    handleFileUpload,
    handleRemoveAvatar,
    handleSave,
    handleQualificationSave,
    handleQualificationCancel,
  } = useCrewCreate();

  const handleBack = () => navigate("/crew");
  const handleCancel = () => navigate("/crew");
  const handleAddNew = () => navigate("/crew/new");
  const crewLabel = t("new_person") || "New Person";

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
            errors={errors}
            isLoading={isLoading}
            avatarPreview={avatarPreview}
            avatarFile={avatarFile}
            onFileUpload={handleFileUpload}
            onRemoveAvatar={handleRemoveAvatar}
          />
        );

      case TAB_KEYS[1]: // qualifications
        return (
          <QualificationForm
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
      case TAB_KEYS[6]: // injury
        return <InjuryForm />;
      case TAB_KEYS[7]: // health
        return <HealthForm />;
      case TAB_KEYS[8]: // experiences
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