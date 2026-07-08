// src/pages/crew/CrewDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCrew } from "../../context/CrewContext";
import { useLanguage } from "../../context/LanguageContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { SubHeader } from "../../components/crew/SubHeader";
import { TabPills, TAB_KEYS } from "../../components/crew/TabPills";
import PersonalInfoForm from "../../components/crew/PersonalInfoForm";
import DynamicTable from "../../components/crew/DynamicTable";
import { TABLE_CONFIGS, DEMO_ROWS } from "../../config/tableConfigs";

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
    navigate("/crew/new");
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
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Qualification,
                rows: DEMO_ROWS.Qualification || [],
              }}
              tabName="Qualification"
              crewId={id}
              onAddNew={() => {
                // ✅ ဒီမှာ ပြင်ပါ - မှန်ကန်တဲ့ path ကိုသွားပါ
                navigate(`/crew/${id}/qualification/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete qualification:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[2]: // appointment
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Appointment,
                rows: DEMO_ROWS.Appointment || [],
              }}
              tabName="Appointment"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/appointment/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete appointment:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[3]: // replacement
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Replacement,
                rows: DEMO_ROWS.Replacement || [],
              }}
              tabName="Replacement"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/replacement/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete replacement:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[4]: // payment
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Payment,
                rows: DEMO_ROWS.Payment || [],
              }}
              tabName="Payment"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/payment/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete payment:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[5]: // family
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Family,
                rows: DEMO_ROWS.Family || [],
              }}
              tabName="Family"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/family/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete family:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[6]: // injury
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Injury,
                rows: DEMO_ROWS.Injury || [],
              }}
              tabName="Injury"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/injury/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete injury:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[7]: // health
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Health,
                rows: DEMO_ROWS.Health || [],
              }}
              tabName="Health"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/health/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete health:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[8]: // experiences
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Experiences,
                rows: DEMO_ROWS.Experiences || [],
              }}
              tabName="Experiences"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/experience/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete experience:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[9]: // evaluation
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Evaluation,
                rows: DEMO_ROWS.Evaluation || [],
              }}
              tabName="Evaluation"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/evaluation/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete evaluation:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[10]: // certificates
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Certificates,
                rows: DEMO_ROWS.Certificates || [],
              }}
              tabName="Certificates"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/certificate/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete certificate:", rowId);
              }}
            />
          </div>
        );

      case TAB_KEYS[11]: // accident
        return (
          <div className="p-6">
            <DynamicTable
              config={{
                ...TABLE_CONFIGS.Accident,
                rows: DEMO_ROWS.Accident || [],
              }}
              tabName="Accident"
              crewId={id}
              onAddNew={() => {
                navigate(`/crew/${id}/accident/new`);
              }}
              onDelete={(rowId) => {
                console.log("Delete accident:", rowId);
              }}
            />
          </div>
        );

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
      />

      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 bg-white">{renderContent()}</div>
    </div>
  );
}
