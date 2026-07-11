// src/features/crew/pages/CrewDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrewById } from "../services/crewSlice";
import { fetchQualificationsByCrewId, deleteQualification } from "../../qualification/services/qualificationSlice";
import SubHeader from "../components/SubHeader";
import TabPills, { TAB_KEYS } from "../components/TabPills";
import PersonalInfoForm from "../../personal-info/components/PersonalInfoForm";
import QualificationList from "../../qualification/components/QualificationList";
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
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);
  const { qualifications, isLoading: isQualLoading } = useSelector((state) => state.qualification);
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCrewById(id));
    }
  }, [dispatch, id]);

  // Load qualifications when Qualification tab is active
  useEffect(() => {
    if (activeTab === TAB_KEYS[1] && id) {
      dispatch(fetchQualificationsByCrewId(id));
    }
  }, [dispatch, id, activeTab]);

  const handleBack = () => navigate("/crew");
  
  // ✅ Edit နှိပ်ရင် Edit Page ကိုသွားမယ်
  const handleEdit = () => {
    navigate(`/crew/${id}/edit`);
  };

  // ✅ Delete Crew
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
        return <OtherTab tabName="Appointment" />;
      case TAB_KEYS[3]: // replacement
        return <OtherTab tabName="Replacement" />;
      case TAB_KEYS[4]: // payment
        return <OtherTab tabName="Payment" />;
      case TAB_KEYS[5]: // family
        return <OtherTab tabName="Family" />;
      case TAB_KEYS[6]: // injury
        return <OtherTab tabName="Injury" />;
      case TAB_KEYS[7]: // health
        return <OtherTab tabName="Health" />;
      case TAB_KEYS[8]: // experiences
        return <OtherTab tabName="Experiences" />;
      case TAB_KEYS[9]: // evaluation
        return <OtherTab tabName="Evaluation" />;
      case TAB_KEYS[10]: // certificates
        return <OtherTab tabName="Certificates" />;
      case TAB_KEYS[11]: // accident
        return <OtherTab tabName="Accident" />;

      default:
        return <OtherTab tabName={activeTab} />;
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* ✅ SubHeader - Edit Button ပါတယ် */}
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

      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 bg-white">{renderContent()}</div>
    </div>
  );
}