// src/pages/crew/CrewProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Download, Plus, Edit2, Trash2, Upload } from "lucide-react";
import { useCrew } from "../../context/CrewContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function Field({
  name,
  label,
  value,
  isEditing,
  isTextArea = false,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-black font-medium">{label}</label>
      {isEditing ? (
        isTextArea ? (
          <textarea
            name={name}
            className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand min-h-[100px]"
            defaultValue={value}
          />
        ) : (
          <input
            type={type}
            name={name}
            className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            defaultValue={value}
          />
        )
      ) : (
        <div className="w-full border border-gray-200 rounded-md p-3 text-sm bg-surface-alt min-h-[46px] flex items-center">
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </div>
      )}
    </div>
  );
}

export default function CrewProfile() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { crews, addCrew, updateCrew, deleteCrew, getCrewById } = useCrew();

  const [crewMember, setCrewMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const isNew = id === "new" || !id;
  const isEditing = isNew || searchParams.get("edit") === "true";

  useEffect(() => {
    const loadCrew = async () => {
      if (!isNew && id) {
        setLoading(true);
        const data = await getCrewById(id);
        if (data) setCrewMember(data);
        else navigate("/crew");
        setLoading(false);
      } else {
        setCrewMember({
          crew_code: "",
          name_kor: "",
          name_eng: "",
          rank: "",
          nationality: "Myanmar",
          phone: "",
          email: "",
          address: "",
        });
        setLoading(false);
      }
    };
    loadCrew();
  }, [id, isNew]);

  const tabs = [
    "Personal Info",
    "Qualification",
    "Appointment",
    "Replacement",
    "Payment",
    "Accident",
    "Family",
    "Health",
    "Injury",
    "Experiences",
    "Evaluation",
    "Certificates",
  ];
  const [activeTab, setActiveTab] = useState("Personal Info");

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let result;
    if (isNew) result = await addCrew(data);
    else result = await updateCrew(id, data);
    if (result) navigate("/crew");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this crew member?")) {
      const success = await deleteCrew(id);
      if (success) navigate("/crew");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col gap-4 sm:gap-6 max-w-full mx-auto pb-12 px-2 sm:px-4"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-lg sm:text-xl font-medium text-text-main">
          {isNew ? "Add New Crew" : "Crew Profile"}
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {!isEditing ? (
            <>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-brand text-text-main hover:bg-brand-lighter transition-colors text-xs sm:text-sm font-medium"
              >
                <Download size={14} /> Export
              </button>
              <button
                type="button"
                onClick={() => navigate("/crew/new")}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-xs sm:text-sm font-medium"
              >
                <Plus size={14} /> Add New
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() =>
                  isNew ? navigate("/crew") : navigate(`/crew/${id}`)
                }
                className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-md border border-brand text-text-main hover:bg-brand-lighter transition-colors text-xs sm:text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-xs sm:text-sm font-medium"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
        <div className="w-16 h-16 sm:w-12 sm:h-12 rounded-full bg-brand-lighter flex items-center justify-center text-brand font-bold text-2xl sm:text-xl flex-shrink-0">
          {crewMember?.name_kor ? crewMember.name_kor.charAt(0) : "?"}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-semibold text-text-main break-words">
            {isNew
              ? "New Crew Member"
              : `${crewMember?.name_kor || ""} [${crewMember?.crew_code || ""}]`}
          </h2>
          <p className="text-xs sm:text-sm text-text-light break-words">
            {!isNew &&
              `${crewMember?.rank || ""} - ${crewMember?.vessel || ""}`}
          </p>
        </div>
        {!isEditing && !isNew && (
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <button
              type="button"
              onClick={() => navigate(`/crew/${id}?edit=true`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 text-text-main hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium"
            >
              <Edit2 size={14} /> Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-accent-red text-accent-red hover:bg-red-50 transition-colors text-xs sm:text-sm font-medium"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-2 flex overflow-x-auto gap-1.5 sm:gap-2 shadow-sm scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "bg-brand-dark text-white" : "bg-white text-brand border border-brand/30 hover:bg-brand-lighter"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-card overflow-hidden">
        <div className="bg-brand-lighter px-4 sm:px-6 py-2 sm:py-3 border-b border-gray-200">
          <h3 className="text-brand-dark font-medium text-sm sm:text-lg">
            {activeTab}
          </h3>
        </div>
        <div className="p-3 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {activeTab === "Personal Info" && (
            <>
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-24 h-28 sm:w-32 sm:h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400 bg-surface-alt">
                  <Upload size={20} className="sm:w-6 sm:h-6 mb-1" />
                  <span className="text-[10px] sm:text-xs">Photo</span>
                </div>
                {isEditing && (
                  <button className="w-full sm:w-auto px-4 py-1.5 border border-text-main rounded text-xs font-medium text-text-main hover:bg-gray-50">
                    Choose File
                  </button>
                )}
              </div>
              <Field
                name="crew_code"
                label="Crew Code"
                value={crewMember?.crew_code || ""}
                isEditing={isEditing}
              />
              <Field
                name="name_kor"
                label="Name (Korean)"
                value={crewMember?.name_kor || ""}
                isEditing={isEditing}
              />
              <Field
                name="name_eng"
                label="Name (English)"
                value={crewMember?.name_eng || ""}
                isEditing={isEditing}
              />
              <Field
                name="rank"
                label="Rank"
                value={crewMember?.rank || ""}
                isEditing={isEditing}
              />
              <Field
                name="nationality"
                label="Nationality"
                value={crewMember?.nationality || "Myanmar"}
                isEditing={isEditing}
              />
              <Field
                name="phone"
                label="Phone"
                value={crewMember?.phone || ""}
                isEditing={isEditing}
              />
              <Field
                name="email"
                label="Email"
                value={crewMember?.email || ""}
                isEditing={isEditing}
                type="email"
              />
              <div className="sm:col-span-2">
                <Field
                  name="address"
                  label="Address"
                  value={crewMember?.address || ""}
                  isEditing={isEditing}
                  isTextArea
                />
              </div>
            </>
          )}
          {/* Other tabs - similar structure */}
        </div>
      </div>
    </form>
  );
}
