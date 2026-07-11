// src/pages/crew/CrewDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCrew } from "../../common/hooks/CrewContext";
import { useLanguage } from "../../common/hooks/LanguageContext";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { SubHeader } from "../../components/crew/SubHeader";
import { TabPills, TAB_KEYS } from "../../components/crew/TabPills";
import PersonalInfoForm from "../../components/crew/PersonalInfoForm";

// ===== IMPORT TAB COMPONENTS =====
import QualificationList from "./qualifications/QualificationList";
import AppointmentList from "./appointments/AppointmentList";
import ReplacementList from "./replacements/ReplacementList";
import PaymentList from "./payments/PaymentList";
import FamilyList from "./families/FamilyList";
import InjuryList from "./injuries/InjuryList";
import HealthList from "./health/HealthList";
import ExperienceList from "./experiences/ExperienceList";
import EvaluationList from "./evaluations/EvaluationList";
// CertificateList ကို ဖယ်ပါ (Qualification နဲ့ တူတယ်)
import AccidentList from "./accidents/AccidentList";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getCrewById, updateCrew } = useCrew();
  const [crewMember, setCrewMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateCrew(id, crewMember);
      navigate("/crew");
    } catch (error) {
      console.error("Failed to update crew:", error);
    }
  };

  const handleCancel = () => {
    navigate("/crew");
  };

  const handleBack = () => {
    navigate("/crew");
  };

  const handleAddNew = () => {
    const tabRoutes = {
      [TAB_KEYS[0]]: `/crew/${id}/personal/new`,
      [TAB_KEYS[1]]: `/crew/${id}/qualification/new`,
      [TAB_KEYS[2]]: `/crew/${id}/appointment/new`,
      [TAB_KEYS[3]]: `/crew/${id}/replacement/new`,
      [TAB_KEYS[4]]: `/crew/${id}/payment/new`,
      [TAB_KEYS[5]]: `/crew/${id}/family/new`,
      [TAB_KEYS[6]]: `/crew/${id}/injury/new`,
      [TAB_KEYS[7]]: `/crew/${id}/health/new`,
      [TAB_KEYS[8]]: `/crew/${id}/experience/new`,
      [TAB_KEYS[9]]: `/crew/${id}/evaluation/new`,
      [TAB_KEYS[10]]: `/crew/${id}/qualification/new`, // ← Certificate → Qualification
      [TAB_KEYS[11]]: `/crew/${id}/accident/new`,
    };

    const route = tabRoutes[activeTab] || `/crew/${id}`;
    navigate(route);
  };

  if (loading) return <LoadingSpinner />;
  if (!crewMember)
    return <div className="text-center py-10">Crew not found</div>;

  const crewLabel = `${crewMember.name_kor || ""} [${crewMember.crew_code || ""}] - ${crewMember.rank || ""} - ${crewMember.vessel || ""}`;

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
        return <QualificationList />;

      case TAB_KEYS[2]: // appointment
        return <AppointmentList />;

      case TAB_KEYS[3]: // replacement
        return <ReplacementList />;

      case TAB_KEYS[4]: // payment
        return <PaymentList />;

      case TAB_KEYS[5]: // family
        return <FamilyList />;

      case TAB_KEYS[6]: // injury
        return <InjuryList />;

      case TAB_KEYS[7]: // health
        return <HealthList />;

      case TAB_KEYS[8]: // experiences
        return <ExperienceList />;

      case TAB_KEYS[9]: // evaluation
        return <EvaluationList />;

      case TAB_KEYS[10]: // certificates → Qualification ကိုပဲ သုံးပါ
        return <QualificationList />;

      case TAB_KEYS[11]: // accident
        return <AccidentList />;

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
        isNew={false}
      />

      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 bg-white">{renderContent()}</div>
    </div>
  );
}
