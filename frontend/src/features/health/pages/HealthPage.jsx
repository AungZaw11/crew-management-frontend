// src/features/health/pages/HealthPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SubHeader from "../../crew/components/SubHeader";
// ✅ Main TabPill ကို import လုပ်ပါ
import TabPills from "../../crew/components/TabPills";
import HealthTabs, { HEALTH_TAB_KEYS, HEALTH_TAB_LABELS } from "../components/HealthTabs";
import InjuryList from "../components/InjuryList";
import MedicalCheckupList from "../components/MedicalCheckupList";
import DiseaseList from "../components/DiseaseList";
import { fetchInjuries, fetchMedicalCheckups, fetchDiseases } from "../services/healthSlice";
import { fetchCrewById } from "../../crew/services/crewSlice";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

export default function HealthPage() {
  const { crewId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  // ✅ URL ကနေ active tab ကိုယူပါ
  const getActiveTabFromUrl = () => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    if (lastSegment === "medical-checkup") {
      return "medical_checkup";
    }
    if (lastSegment === "disease") {
      return "disease";
    }
    return "injury";
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl);

  const { 
    injuries, 
    medicalCheckups, 
    diseases, 
    isLoading 
  } = useSelector((state) => state.health || { injuries: [], medicalCheckups: [], diseases: [], isLoading: false });
  
  // ✅ Crew Data ကို Redux ကနေယူပါ
  const { selectedCrew } = useSelector((state) => state.crew || {});

  // ✅ Crew Data ကိုပါ fetch လုပ်ပါ
  useEffect(() => {
    if (crewId) {
      dispatch(fetchCrewById(crewId));
      dispatch(fetchInjuries(crewId));
      dispatch(fetchMedicalCheckups(crewId));
      dispatch(fetchDiseases(crewId));
    }
  }, [dispatch, crewId]);

  // ✅ Tab ပြောင်းတဲ့အခါ URL ကိုပြောင်းပါ
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    let path = `/crew/${crewId}/health`;
    
    if (tabKey === "medical_checkup") {
      path = `/crew/${crewId}/health/medical-checkup`;
    } else if (tabKey === "disease") {
      path = `/crew/${crewId}/health/disease`;
    }
    navigate(path);
  };

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  // ✅ Add New နှိပ်ရင် activeTab ပေါ်မူတည်ပြီး မှန်ကန်တဲ့ path ကိုသွားပါ
  const handleAdd = () => {
    if (activeTab === "injury") {
      navigate(`/crew/${crewId}/health/injury/new`);
    } else if (activeTab === "medical_checkup") {
      navigate(`/crew/${crewId}/health/medical-checkup/new`);
    } else if (activeTab === "disease") {
      navigate(`/crew/${crewId}/health/disease/new`);
    }
  };

  const getAddLabel = () => {
    const labels = {
      injury: "Add Injury",
      medical_checkup: "Add Medical Checkup",
      disease: "Add Disease",
    };
    return labels[activeTab] || "Add";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "injury":
        return <InjuryList injuries={injuries} crewId={crewId} isLoading={isLoading} />;
      case "medical_checkup":
        return <MedicalCheckupList checkups={medicalCheckups} crewId={crewId} isLoading={isLoading} />;
      case "disease":
        return <DiseaseList diseases={diseases} crewId={crewId} isLoading={isLoading} />;
      default:
        return <InjuryList injuries={injuries} crewId={crewId} isLoading={isLoading} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const activeLabel = HEALTH_TAB_LABELS[activeTab] || "Health";

  const crewName = selectedCrew?.name_eng || selectedCrew?.name_kor || "";
  const crewCode = selectedCrew?.crew_code || "";
  const crewRank = selectedCrew?.rank || "";
  const vesselName = selectedCrew?.vessel || "";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={activeLabel}
        showAddNew={true}
        onAddNew={handleAdd}
        addLabel={getAddLabel()}
        crewName={crewName}
        crewCode={crewCode}
        crewRank={crewRank}
        vesselName={vesselName}
        activeTabLabel={activeLabel}
        buttonType="add"
        onAdd={handleAdd}
      />

      <TabPills 
        activeTab="health"  
        setActiveTab={() => {}}  
        crewId={crewId}
      />

      <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-200">
        <HealthTabs activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      <div className="flex-1 bg-white p-6">
        {renderContent()}
      </div>
    </div>
  );
}