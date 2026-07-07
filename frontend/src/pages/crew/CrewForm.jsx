// src/pages/crew/CrewForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrew } from "../../context/CrewContext";
import { useLanguage } from "../../context/LanguageContext";
import { toast } from "react-toastify";
import { SubHeader } from "../../components/crew/SubHeader";
import { TabPills, TABS } from "../../components/crew/TabPills";
import PersonalInfoForm from "../../components/crew/PersonalInfoForm";

function OtherTab({ tabName }) {
  return (
    <div className="text-center py-12 text-text-light">
      <p className="text-lg">{tabName} content goes here</p>
    </div>
  );
}

export default function CrewForm() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addCrew } = useCrew();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [formData, setFormData] = useState({
    crew_code: "",
    name_kor: "",
    name_eng: "",
    rank: "",
    nationality: "Myanmar",
    phone: "",
    email: "",
    address: "",
    birth_date: "",
    hire_date: "",
    vessel: "",
    note: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await addCrew(formData);
    if (result) {
      toast.success("✅ Crew registered successfully!");
      navigate("/crew");
    }
    setLoading(false);
  };

  const handleBack = () => {
    navigate("/crew");
  };

  const handleAddNew = () => {
    // Already on add new page
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return (
          <PersonalInfoForm
            crewMember={formData}
            isEditing={true}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleBack}
          />
        );
      default:
        return <OtherTab tabName={activeTab} />;
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* SubHeader - New Person */}
      <SubHeader
        onBack={handleBack}
        onAddNew={handleAddNew}
        crewLabel="New Person"
        isNew={true}
        showAddNew={false}
      />

      {/* TabPills - 12 Tabs */}
      <TabPills activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 bg-white">{renderTabContent()}</div>
    </div>
  );
}
