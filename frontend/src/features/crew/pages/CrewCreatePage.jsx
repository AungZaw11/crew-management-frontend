// src/features/crew/pages/CrewCreatePage.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCrewCreate } from "../hooks/useCrewCreate";
import { fetchCrewById } from "../services/crewSlice";
import SubHeader from "../components/SubHeader";
import TabPills, { TAB_KEYS, ROUTE_TAB_MAP } from "../components/TabPills";
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
import LoadingSpinner from "../../../common/components/LoadingSpinner";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewCreatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  const { selectedCrew, isLoading: isFetching } = useSelector((state) => state.crew);
  const isEditMode = !!id;

  // ✅ URL ကနေ Active Tab ကိုဆုံးဖြတ်ပါ (Edit Mode အတွက်)
  const getActiveTabFromUrl = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const tabKey = Object.keys(ROUTE_TAB_MAP).find(
      key => ROUTE_TAB_MAP[key] === lastSegment
    );
    return tabKey || TAB_KEYS[0];
  };

  const {
    activeTab,
    setActiveTab,
    crewMember,
    setCrewMember,
    errors,
    isLoading,
    avatarPreview,
    avatarFile,
    handleChange,
    handleFileUpload,
    handleRemoveAvatar,
    handleSave,
    // Qualification
    qualificationData,
    qualificationErrors,
    qualificationFile,
    handleQualificationChange,
    handleQualificationFileUpload,
    handleQualificationFileRemove,
    handleQualificationSave,
    handleQualificationCancel,
    // Appointment
    appointmentData,
    appointmentErrors,
    handleAppointmentChange,
    handleAppointmentSave,
    handleAppointmentCancel,
    // Replacement
    replacementData,
    replacementErrors,
    handleReplacementChange,
    handleReplacementSave,
    handleReplacementCancel,
    // Payment
    paymentData,
    paymentErrors,
    handlePaymentChange,
    handlePaymentSave,
    handlePaymentCancel,
    // Family
    familyData,
    familyErrors,
    handleFamilyChange,
    handleFamilySave,
    handleFamilyCancel,
    // Injury
    injuryData,
    injuryErrors,
    handleInjuryChange,
    handleInjurySave,
    handleInjuryCancel,
    // Health
    healthData,
    healthErrors,
    handleHealthChange,
    handleHealthSave,
    handleHealthCancel,
    // Experience
    experienceData,
    experienceErrors,
    handleExperienceChange,
    handleExperienceSave,
    handleExperienceCancel,
    // Evaluation
    evaluationData,
    evaluationErrors,
    handleEvaluationChange,
    handleEvaluationSave,
    handleEvaluationCancel,
    // Accident
    accidentData,
    accidentErrors,
    handleAccidentChange,
    handleAccidentSave,
    handleAccidentCancel,
  } = useCrewCreate(isEditMode, selectedCrew);

  // ✅ Edit Mode ဆိုရင် Data ကိုဆွဲပါ
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchCrewById(id));
    }
  }, [dispatch, id, isEditMode]);

  // ✅ Data ရောက်ရင် Form ကိုထည့်ပါ
  useEffect(() => {
    if (isEditMode && selectedCrew) {
      setCrewMember(selectedCrew);
    }
  }, [isEditMode, selectedCrew, setCrewMember]);

  // ✅ URL ကနေ Tab ကိုယူပြီး set လုပ်ပါ
  useEffect(() => {
    if (isEditMode) {
      const tabFromUrl = getActiveTabFromUrl();
      if (tabFromUrl && tabFromUrl !== activeTab) {
        setActiveTab(tabFromUrl);
      }
    }
  }, [location.pathname, isEditMode]);

  // ✅ Tab ပြောင်းရင် URL ကိုပြောင်းပါ (Edit Mode အတွက်)
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (isEditMode && id) {
      const routePath = ROUTE_TAB_MAP[tabKey];
      if (routePath) {
        navigate(`/crew/${id}/edit/${routePath}`);
      } else {
        navigate(`/crew/${id}/edit`);
      }
    }
  };

  const handleBack = () => navigate("/crew");
  const handleCancel = () => navigate("/crew");
  const handleAddNew = () => navigate("/crew/new");
  
  const crewLabel = isEditMode 
    ? selectedCrew?.name_eng || selectedCrew?.name_kor || "Edit Crew"
    : t("new_person") || "New Person";

  if (isFetching && isEditMode) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case TAB_KEYS[0]:
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

      case TAB_KEYS[1]:
        return (
          <QualificationForm
            formData={qualificationData}
            onChange={handleQualificationChange}
            onSave={handleQualificationSave}
            onCancel={handleQualificationCancel}
            errors={qualificationErrors}
            isLoading={isLoading}
            uploadedFile={qualificationFile}
            onFileUpload={handleQualificationFileUpload}
            onFileRemove={handleQualificationFileRemove}
          />
        );

      case TAB_KEYS[2]:
        return (
          <AppointmentForm
            formData={appointmentData}
            onChange={handleAppointmentChange}
            onSave={handleAppointmentSave}
            onCancel={handleAppointmentCancel}
            errors={appointmentErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[3]:
        return (
          <ReplacementForm
            formData={replacementData}
            onChange={handleReplacementChange}
            onSave={handleReplacementSave}
            onCancel={handleReplacementCancel}
            errors={replacementErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[4]:
        return (
          <PaymentForm
            formData={paymentData}
            onChange={handlePaymentChange}
            onSave={handlePaymentSave}
            onCancel={handlePaymentCancel}
            errors={paymentErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[5]:
        return (
          <FamilyForm
            formData={familyData}
            onChange={handleFamilyChange}
            onSave={handleFamilySave}
            onCancel={handleFamilyCancel}
            errors={familyErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[6]:
        return (
          <InjuryForm
            formData={injuryData}
            onChange={handleInjuryChange}
            onSave={handleInjurySave}
            onCancel={handleInjuryCancel}
            errors={injuryErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[7]:
        return (
          <HealthForm
            formData={healthData}
            onChange={handleHealthChange}
            onSave={handleHealthSave}
            onCancel={handleHealthCancel}
            errors={healthErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[8]:
        return (
          <ExperienceForm
            formData={experienceData}
            onChange={handleExperienceChange}
            onSave={handleExperienceSave}
            onCancel={handleExperienceCancel}
            errors={experienceErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[9]:
        return (
          <EvaluationForm
            formData={evaluationData}
            onChange={handleEvaluationChange}
            onSave={handleEvaluationSave}
            onCancel={handleEvaluationCancel}
            errors={evaluationErrors}
            isLoading={isLoading}
          />
        );

      case TAB_KEYS[10]:
        return <OtherTab tabName="Certificates" />;

      case TAB_KEYS[11]:
        return (
          <AccidentForm
            formData={accidentData}
            onChange={handleAccidentChange}
            onSave={handleAccidentSave}
            onCancel={handleAccidentCancel}
            errors={accidentErrors}
            isLoading={isLoading}
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
        isNew={!isEditMode}
        crewLabel={crewLabel}
        showAddNew={false}
      />

      {/* ✅ TabPills - Edit Mode ဆိုရင် Route နဲ့ချိတ်ပါ */}
      <TabPills 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        crewId={isEditMode ? id : null}
        isEditMode={isEditMode}
      />

      <div className="flex-1 bg-white">{renderContent()}</div>
    </div>
  );
}