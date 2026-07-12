// src/features/crew/pages/CrewDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrewById } from "../services/crewSlice";
import { fetchQualificationsByCrewId, deleteQualification } from "../../qualification/services/qualificationSlice";
import SubHeader from "../components/SubHeader";
import TabPills, { TAB_KEYS, ROUTE_TAB_MAP } from "../components/TabPills";
import PersonalInfoForm from "../../personal-info/components/PersonalInfoForm";
import QualificationList from "../../qualification/components/QualificationList";
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
import toastHelper from "../../../utils/toastHelper";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);
  const { qualifications, isLoading: isQualLoading } = useSelector((state) => state.qualification);
  
 
  const getActiveTabFromUrl = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const tabKey = Object.keys(ROUTE_TAB_MAP).find(
      key => ROUTE_TAB_MAP[key] === lastSegment
    );
    return tabKey || TAB_KEYS[0];
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl);

  useEffect(() => {
    if (id) {
      dispatch(fetchCrewById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (activeTab === TAB_KEYS[1] && id) {
      dispatch(fetchQualificationsByCrewId(id));
    }
  }, [dispatch, id, activeTab]);

  const handleBack = () => navigate("/crew");
  
  const handleEdit = () => {
    navigate(`/crew/${id}/edit`);
  };

  const handleDeleteCrew = async () => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete this crew member?")) {
      try {
        // TODO: dispatch deleteCrew(id)
        toastHelper.success("Crew deleted successfully!");
        navigate("/crew");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete crew");
      }
    }
  };

  const handleDeleteQualification = async (qualId) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        await dispatch(deleteQualification(qualId)).unwrap();
        toastHelper.success(t("qualification_deleted") || "Qualification deleted!");
        dispatch(fetchQualificationsByCrewId(id));
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleEditQualification = (qualId) => {
    navigate(`/crew/${id}/qualification/${qualId}/edit`);
  };

  const handleViewQualification = (qualId) => {
    navigate(`/crew/${id}/qualification/${qualId}`);
  };

  if (isCrewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedCrew) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("crew_not_found") || "Crew not found"}</p>
        <button
          onClick={() => navigate("/crew")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t("back_to_list") || "Back to List"}
        </button>
      </div>
    );
  }

  const crewLabel = selectedCrew.name_eng || selectedCrew.name_kor || "Crew Member";

  const renderContent = () => {
    switch (activeTab) {
      case TAB_KEYS[0]: // personal_info
        return (
          <PersonalInfoForm
            crewMember={selectedCrew}
            isEditing={false}
            crewId={id}
          />
        );

      case TAB_KEYS[1]: // qualifications
        return (
          <QualificationList
            qualifications={qualifications}
            crewId={id}
            onEdit={handleEditQualification}
            onDelete={handleDeleteQualification}
            onView={handleViewQualification}
            isLoading={isQualLoading}
          />
        );

      case TAB_KEYS[2]: // appointment
        return <AppointmentForm isEditing={false} />;
        
      case TAB_KEYS[3]: // replacement
        return <ReplacementForm isEditing={false} />;
        
      case TAB_KEYS[4]: // payment
        return <PaymentForm isEditing={false} />;
        
      case TAB_KEYS[5]: // family
        return <FamilyForm isEditing={false} />;
        
      case TAB_KEYS[6]: // injury
        return <InjuryForm isEditing={false} />;
        
      case TAB_KEYS[7]: // health
        return <HealthForm isEditing={false} />;
        
      case TAB_KEYS[8]: // experiences
        return <ExperienceForm isEditing={false} />;
        
      case TAB_KEYS[9]: // evaluation
        return <EvaluationForm isEditing={false} />;
        
      case TAB_KEYS[10]: // accident
        return <AccidentForm isEditing={false} />;

      default:
        return <OtherTab tabName={activeTab} />;
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={crewLabel}
        showAddNew={false}
        showEdit={true}
        onEdit={handleEdit}
        showDelete={true}
        onDelete={handleDeleteCrew}
        isEditMode={false}
      />

      
      <TabPills 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        crewId={id}  
      />

      <div className="flex-1 bg-white">{renderContent()}</div>
    </div>
  );
}