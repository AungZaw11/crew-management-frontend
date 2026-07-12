// src/features/health/pages/HealthCreatePage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SubHeader from "../../crew/components/SubHeader";
import InjuryForm from "../components/InjuryForm";
import MedicalCheckupForm from "../components/MedicalCheckupForm";
import DiseaseForm from "../components/DiseaseForm";
import { createInjury, createMedicalCheckup, createDisease } from "../services/healthSlice";
import toastHelper from "../../../utils/toastHelper";

export default function HealthCreatePage() {
  const { crewId, tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ URL ကနေ tab ကို မှန်ကန်စွာ ယူပါ
  const getActiveTab = () => {
    // tab က "medical-checkup" ဆိုရင် "medical_checkup" ဖြစ်အောင်ပြောင်းပါ
    if (tab === "medical-checkup") {
      return "medical_checkup";
    }
    return tab || "injury";
  };

  const activeTab = getActiveTab();

  console.log("🔹 HealthCreatePage - tab param:", tab);
  console.log("🔹 HealthCreatePage - activeTab:", activeTab);

  const handleBack = () => {
    let path = `/crew/${crewId}/health`;
    if (activeTab === "medical_checkup") {
      path = `/crew/${crewId}/health/medical-checkup`;
    } else if (activeTab === "disease") {
      path = `/crew/${crewId}/health/disease`;
    }
    navigate(path);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    const toastId = toastHelper.loading("Saving...");

    try {
      const payload = { ...data, crewId };

      let result;
      switch (activeTab) {
        case "injury":
          result = await dispatch(createInjury(payload)).unwrap();
          break;
        case "medical_checkup":
          result = await dispatch(createMedicalCheckup(payload)).unwrap();
          break;
        case "disease":
          result = await dispatch(createDisease(payload)).unwrap();
          break;
        default:
          throw new Error("Invalid tab");
      }

      console.log("Created:", result);
      toastHelper.updateLoadingToSuccess(toastId, "Saved successfully!");
      
      let path = `/crew/${crewId}/health`;
      if (activeTab === "medical_checkup") {
        path = `/crew/${crewId}/health/medical-checkup`;
      } else if (activeTab === "disease") {
        path = `/crew/${crewId}/health/disease`;
      }
      navigate(path);
    } catch (error) {
      console.error("Save error:", error);
      toastHelper.updateLoadingToError(toastId, error.message || "Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    const commonProps = {
      onSave: handleSave,
      onCancel: handleBack,
      isLoading: isLoading,
    };

    console.log("🔹 Rendering form for tab:", activeTab);

    switch (activeTab) {
      case "injury":
        return <InjuryForm {...commonProps} />;
      case "medical_checkup":
        return <MedicalCheckupForm {...commonProps} />;
      case "disease":
        return <DiseaseForm {...commonProps} />;
      default:
        return <InjuryForm {...commonProps} />;
    }
  };

  const getLabel = () => {
    const labels = {
      injury: t("add_injury") || "Add Injury",
      medical_checkup: t("add_medical-checkup") || "Add Medical Checkup",
      disease: t("add_disease") || "Add Disease",
    };
    return labels[activeTab] || "Add";
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={true}
        crewLabel={getLabel()}
        showAddNew={false}
      />

      <div className="flex-1 bg-white p-6">
        {renderForm()}
      </div>
    </div>
  );
}