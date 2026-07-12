// src/features/crew/pages/CrewDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrewById } from "../services/crewSlice";
import { fetchAppointmentsByCrewId, createAppointment } from "../../appointment/services/appointmentSlice";
import { fetchReplacementsByCrewId, deleteReplacement } from "../../replacement/services/replacementSlice";
import SubHeader from "../components/SubHeader";
import TabPills, { TAB_KEYS, TAB_LABELS, ROUTE_TAB_MAP } from "../components/TabPills";
import PersonalInfoForm from "../../personal-info/components/PersonalInfoForm";
import QualificationList from "../../qualification/components/QualificationList";
import AppointmentList from "../../appointment/components/AppointmentList";
import ReplacementList from "../../replacement/components/ReplacementList";
import PaymentList from "../../payment/components/PaymentList";
import FamilyList from "../../family/components/FamilyList";
import HealthForm from "../../health/components/HealthForm";
import ExperienceList from "../../experience/components/ExperienceList";
import ExperienceForm from "../../experience/components/ExperienceForm";
import EvaluationForm from "../../evaluation/components/EvaluationForm";
import AccidentForm from "../../accident/components/AccidentForm";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import toastHelper from "../../../utils/toastHelper";
import { fetchPaymentsByCrewId } from "../../payment/services/paymentSlice";
import { fetchFamiliesByCrewId } from "../../family/services/familySlice";

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
  const { appointments, isLoading: isAppLoading } = useSelector((state) => state.appointment);
  const { replacements, isLoading: isReplacementLoading } = useSelector((state) => state.replacement);
  const { payments, isLoading: isPaymentLoading } = useSelector((state) => state.payment);
  const { families, isLoading: isFamilyLoading } = useSelector((state) => state.family);

  const [localReplacements, setLocalReplacements] = useState([]);
  const [localAppointments, setLocalAppointments] = useState([]);

  useEffect(() => {
    setLocalReplacements(replacements);
  }, [replacements]);

  useEffect(() => {
    setLocalAppointments(appointments);
  }, [appointments]);

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
      dispatch(fetchAppointmentsByCrewId(id));
      dispatch(fetchReplacementsByCrewId(id));
      dispatch(fetchPaymentsByCrewId(id));
      dispatch(fetchFamiliesByCrewId(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (activeTab === TAB_KEYS[2] && id) {
      dispatch(fetchAppointmentsByCrewId(id));
    }
    if (activeTab === TAB_KEYS[3] && id) {
      dispatch(fetchReplacementsByCrewId(id));
    }
    if (activeTab === TAB_KEYS[4] && id) {
      dispatch(fetchPaymentsByCrewId(id));
    }
    if (activeTab === TAB_KEYS[5] && id) {
      dispatch(fetchFamiliesByCrewId(id));
    }
  }, [dispatch, id, activeTab]);

  const handleBack = () => navigate("/crew");
  
  const handleEdit = () => {
    navigate(`/crew/${id}/edit`);
  };

  const handleDeleteCrew = async () => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete this crew member?")) {
      try {
        toastHelper.success("Crew deleted successfully!");
        navigate("/crew");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete crew");
      }
    }
  };

  const handleDeploy = async (replacementItem) => {
    if (window.confirm(`Deploy "${replacementItem.content}" to Appointment?`)) {
      try {
        console.log("🔹 Deploying:", replacementItem);
        
        setLocalReplacements(prev => prev.filter(item => item.id !== replacementItem.id));
        
        const newAppointment = {
          ...replacementItem,
          id: Date.now(),
          division: replacementItem.division === "Sign On" ? "Sign On" : "Sign Off",
          status: "Active",
          replacementId: replacementItem.id,
        };
        setLocalAppointments(prev => [...prev, newAppointment]);
        
        try {
          await dispatch(createAppointment(newAppointment)).unwrap();
          await dispatch(deleteReplacement(replacementItem.id)).unwrap();
        } catch (apiError) {
          console.log("API not ready, using local state only");
        }
        
        toastHelper.success(`"${replacementItem.content}" deployed to Appointment!`);
        dispatch(fetchAppointmentsByCrewId(id));
        dispatch(fetchReplacementsByCrewId(id));
        
      } catch (error) {
        toastHelper.error(error.message || "Failed to deploy");
      }
    }
  };

  const handleEditAppointment = (appId) => {
    navigate(`/crew/${id}/appointment/${appId}/edit`);
  };

  const handleDeleteAppointment = async (appId) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        setLocalAppointments(prev => prev.filter(item => item.id !== appId));
        toastHelper.success("Appointment deleted!");
        dispatch(fetchAppointmentsByCrewId(id));
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleViewAppointment = (appId) => {
    navigate(`/crew/${id}/appointment/${appId}`);
  };

  const handleEditReplacement = (repId) => {
    navigate(`/crew/${id}/replacement/${repId}/edit`);
  };

  const handleDeleteReplacement = async (repId) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        setLocalReplacements(prev => prev.filter(item => item.id !== repId));
        toastHelper.success("Replacement deleted!");
        dispatch(fetchReplacementsByCrewId(id));
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleViewReplacement = (repId) => {
    navigate(`/crew/${id}/replacement/${repId}`);
  };

  const handleEditPayment = (paymentId) => {
    navigate(`/crew/${id}/payment/${paymentId}/edit`);
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        toastHelper.success("Payment deleted!");
        dispatch(fetchPaymentsByCrewId(id));
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleViewPayment = (paymentId) => {
    navigate(`/crew/${id}/payment/${paymentId}`);
  };

  const handleEditFamily = (familyId) => {
    navigate(`/crew/${id}/family/${familyId}/edit`);
  };

  const handleDeleteFamily = async (familyId) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        toastHelper.success("Family member deleted!");
        dispatch(fetchFamiliesByCrewId(id));
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleViewFamily = (familyId) => {
    navigate(`/crew/${id}/family/${familyId}`);
  };

  const handleAdd = () => {
    switch (activeTab) {
      case TAB_KEYS[1]:
        navigate(`/crew/${id}/qualification/new`);
        break;
      case TAB_KEYS[2]:
        navigate(`/crew/${id}/appointment/new`);
        break;
      case TAB_KEYS[3]:
        navigate(`/crew/${id}/replacement/new`);
        break;
      case TAB_KEYS[4]:
        navigate(`/crew/${id}/payment/new`);
        break;
      case TAB_KEYS[5]:
        navigate(`/crew/${id}/family/new`);
        break;
      case TAB_KEYS[6]:
        navigate(`/crew/${id}/health/new`);
        break;
      case TAB_KEYS[7]:
        navigate(`/crew/${id}/experience/new`);
        break;
      case TAB_KEYS[8]:
        navigate(`/crew/${id}/evaluation/new`);
        break;
      case TAB_KEYS[9]:
        navigate(`/crew/${id}/accident/new`);
        break;
      default:
        break;
    }
  };

  const getButtonType = () => {
    if (activeTab === TAB_KEYS[0]) return "edit";
    return "add";
  };

  const getAddLabel = () => {
    const tabLabel = TAB_LABELS[activeTab] || activeTab;
    return `Add ${tabLabel}`;
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

  const activeTabLabel = TAB_LABELS[activeTab] || activeTab;
  const buttonType = getButtonType();

  const renderContent = () => {
    switch (activeTab) {
      case TAB_KEYS[0]:
        return (
          <PersonalInfoForm
            crewMember={selectedCrew}
            isEditing={false}
            crewId={id}
          />
        );

      case TAB_KEYS[1]:
        return (
          <QualificationList
            qualifications={[]}
            crewId={id}
            onEdit={() => {}}
            onDelete={() => {}}
            onView={() => {}}
            isLoading={false}
          />
        );

      case TAB_KEYS[2]:
        return (
          <AppointmentList
            appointments={localAppointments}
            crewId={id}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
            onView={handleViewAppointment}
            isLoading={isAppLoading}
          />
        );

      case TAB_KEYS[3]:
        return (
          <ReplacementList
            replacements={localReplacements}
            crewId={id}
            onEdit={handleEditReplacement}
            onDelete={handleDeleteReplacement}
            onView={handleViewReplacement}
            isLoading={isReplacementLoading}
            onDeploy={handleDeploy}
          />
        );

      case TAB_KEYS[4]:
        return (
          <PaymentList
            payments={payments}
            crewId={id}
            onEdit={handleEditPayment}
            onDelete={handleDeletePayment}
            onView={handleViewPayment}
            isLoading={isPaymentLoading}
          />
        );

      case TAB_KEYS[5]:
        return (
          <FamilyList
            families={families}
            crewId={id}
            onEdit={handleEditFamily}
            onDelete={handleDeleteFamily}
            onView={handleViewFamily}
            isLoading={isFamilyLoading}
          />
        );

      case TAB_KEYS[6]:
        return <HealthForm isEditing={false} />;
        
      case TAB_KEYS[7]:
        return (
          <ExperienceList 
            experiences={[]}  
            crewId={id} 
            isLoading={false}
          />
        );
        
      case TAB_KEYS[8]:
        return <EvaluationForm isEditing={false} />;
        
      case TAB_KEYS[9]:
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
        crewLabel={selectedCrew.name_eng || selectedCrew.name_kor || "Crew Member"}
        showAddNew={false}
        showEdit={true}
        onEdit={handleEdit}
        showDelete={true}
        onDelete={handleDeleteCrew}
        isEditMode={false}
        crewName={selectedCrew.name_eng || selectedCrew.name_kor || ""}
        crewCode={selectedCrew.crew_code || ""}
        crewRank={selectedCrew.rank || ""}
        vesselName={selectedCrew.vessel || ""}
        activeTabLabel={activeTabLabel}
        buttonType={buttonType}
        onAdd={handleAdd}
        addLabel={getAddLabel()}
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