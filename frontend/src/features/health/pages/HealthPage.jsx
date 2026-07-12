// src/features/health/pages/HealthPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SubHeader from "../../crew/components/SubHeader";
import HealthTabs, { HEALTH_TAB_KEYS, HEALTH_TAB_LABELS } from "../components/HealthTabs";
import InjuryList from "../components/InjuryList";
import MedicalCheckupList from "../components/MedicalCheckupList";
import DiseaseList from "../components/DiseaseList";
import { fetchInjuries, fetchMedicalCheckups, fetchDiseases } from "../services/healthSlice";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

export default function HealthPage() {
  const { crewId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  const getActiveTabFromUrl = () => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment === "injury" || lastSegment === "medical-checkup" || lastSegment === "disease") {
      return lastSegment;
    }
    return "injury";
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl);

  const { 
    injuries, 
    medicalCheckups, 
    diseases, 
    isLoading 
  } = useSelector((state) => state.health);

  useEffect(() => {
    if (crewId) {
      dispatch(fetchInjuries(crewId));
      dispatch(fetchMedicalCheckups(crewId));
      dispatch(fetchDiseases(crewId));
    }
  }, [dispatch, crewId]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    const tabPath = tabKey === "injury" ? "" : `/${tabKey}`;
    navigate(`/crew/${crewId}/health${tabPath}`);
  };

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  const handleAdd = () => {
    const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
    navigate(`/crew/${crewId}/health${tabPath}/new`);
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
        return null;
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

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={activeLabel}
        showAddNew={true}
        onAddNew={handleAdd}
        addLabel={getAddLabel()}
      />

      <HealthTabs activeTab={activeTab} setActiveTab={handleTabChange} />

      <div className="flex-1 bg-white p-6">
        {renderContent()}
      </div>
    </div>
  );
}