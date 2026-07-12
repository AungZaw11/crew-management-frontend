// src/features/health/pages/HealthEditPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SubHeader from "../../crew/components/SubHeader";
import InjuryForm from "../components/InjuryForm";
import MedicalCheckupForm from "../components/MedicalCheckupForm";
import DiseaseForm from "../components/DiseaseForm";
import {
  fetchInjuryById,
  fetchMedicalCheckupById,
  fetchDiseaseById,
  updateInjury,
  updateMedicalCheckup,
  updateDisease,
} from "../services/healthSlice";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import toastHelper from "../../../utils/toastHelper";

export default function HealthEditPage() {
  const { crewId, tab, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const activeTab = tab || "injury";

  const { selectedInjury, selectedMedicalCheckup, selectedDisease } = useSelector(
    (state) => state.health
  );

  // ===== GET SELECTED DATA =====
  const getSelectedData = () => {
    switch (activeTab) {
      case "injury":
        return selectedInjury;
      case "medical_checkup":
        return selectedMedicalCheckup;
      case "disease":
        return selectedDisease;
      default:
        return null;
    }
  };

  const selectedData = getSelectedData();

  // ===== FETCH DATA =====
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        switch (activeTab) {
          case "injury":
            await dispatch(fetchInjuryById(id)).unwrap();
            break;
          case "medical_checkup":
            await dispatch(fetchMedicalCheckupById(id)).unwrap();
            break;
          case "disease":
            await dispatch(fetchDiseaseById(id)).unwrap();
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toastHelper.error("Failed to load data");
        const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
        navigate(`/crew/${crewId}/health${tabPath}`);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [dispatch, id, activeTab, crewId, navigate]);

  const handleBack = () => {
    const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
    navigate(`/crew/${crewId}/health${tabPath}`);
  };

  const handleUpdate = async (data) => {
    setIsLoading(true);
    const toastId = toastHelper.loading("Updating...");

    try {
      const payload = { id, data: { ...data, crewId } };

      switch (activeTab) {
        case "injury":
          await dispatch(updateInjury(payload)).unwrap();
          break;
        case "medical_checkup":
          await dispatch(updateMedicalCheckup(payload)).unwrap();
          break;
        case "disease":
          await dispatch(updateDisease(payload)).unwrap();
          break;
        default:
          throw new Error("Invalid tab");
      }

      toastHelper.updateLoadingToSuccess(toastId, "Updated successfully!");
      const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
      navigate(`/crew/${crewId}/health${tabPath}`);
    } catch (error) {
      console.error("Update error:", error);
      toastHelper.updateLoadingToError(toastId, error.message || "Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (isFetching) {
      return (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      );
    }

    const commonProps = {
      formData: selectedData || {},
      onSave: handleUpdate,
      onCancel: handleBack,
      isLoading: isLoading,
      isEdit: true,
    };

    switch (activeTab) {
      case "injury":
        return <InjuryForm {...commonProps} />;
      case "medical_checkup":
        return <MedicalCheckupForm {...commonProps} />;
      case "disease":
        return <DiseaseForm {...commonProps} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    const labels = {
      injury: t("edit_injury") || "Edit Injury",
      medical_checkup: t("edit_medical_checkup") || "Edit Medical Checkup",
      disease: t("edit_disease") || "Edit Disease",
    };
    return labels[activeTab] || "Edit";
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={getLabel()}
        showAddNew={false}
      />

      <div className="flex-1 bg-white p-6">
        {renderForm()}
      </div>
    </div>
  );
}