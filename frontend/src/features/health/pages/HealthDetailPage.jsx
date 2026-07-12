// src/features/health/pages/HealthDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SubHeader from "../../crew/components/SubHeader";
import {
  fetchInjuryById,
  fetchMedicalCheckupById,
  fetchDiseaseById,
} from "../services/healthSlice";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { Calendar, User, Building2, Pill } from "lucide-react";

export default function HealthDetailPage() {
  const { crewId, tab, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  const activeTab = tab || "injury";

  const {
    selectedInjury,
    selectedMedicalCheckup,
    selectedDisease,
    isLoading: isFetching,
  } = useSelector((state) => state.health);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [dispatch, id, activeTab]);

  const handleBack = () => {
    const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
    navigate(`/crew/${crewId}/health${tabPath}`);
  };

  const handleEdit = () => {
    const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
    navigate(`/crew/${crewId}/health${tabPath}/${id}/edit`);
  };

  const getData = () => {
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

  const data = getData();

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Record not found</p>
        <button onClick={handleBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Back
        </button>
      </div>
    );
  }

  const getLabel = () => {
    const labels = {
      injury: "Injury Details",
      medical_checkup: "Medical Checkup Details",
      disease: "Disease Details",
    };
    return labels[activeTab] || "Details";
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={getLabel()}
        showEdit={true}
        onEdit={handleEdit}
        showAddNew={false}
      />

      <div className="flex-1 bg-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-md border border-gray-200 p-6">
          {/* Render detail fields based on tab */}
          {activeTab === "injury" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">Illness</label>
                <p className="font-medium">{data.illness || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Medical Name</label>
                <p className="font-medium">{data.medicalName || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Hospital</label>
                <p className="font-medium">{data.hospital || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Treatment Start</label>
                <p className="font-medium">{data.treatmentStart || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Recovery Date</label>
                <p className="font-medium">{data.recoveryDate || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Type</label>
                <p className="font-medium">{data.type || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Expense_won</label>
                <p className="font-medium">{data.expenseWon || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Expense_ex</label>
                <p className="font-medium">{data.expenseEx || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Remarks</label>
                <p className="font-medium">{data.remarks || "-"}</p>
              </div>
            </div>
          )}

          {activeTab === "medical_checkup" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">{data.date || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Height</label>
                <p className="font-medium">{data.height || "-"} cm</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Weight</label>
                <p className="font-medium">{data.weight || "-"} kg</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Sight (L)</label>
                <p className="font-medium">{data.sightLeft || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Sight (R)</label>
                <p className="font-medium">{data.sightRight || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Hearing (L)</label>
                <p className="font-medium">{data.hearingLeft || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Hearing (R)</label>
                <p className="font-medium">{data.hearingRight || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Blood</label>
                <p className="font-medium">{data.blood || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Decision</label>
                <p className="font-medium">{data.decision || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Remarks</label>
                <p className="font-medium">{data.remarks || "-"}</p>
              </div>
            </div>
          )}

          {activeTab === "disease" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">Start Date</label>
                <p className="font-medium">{data.startDate || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">End Date</label>
                <p className="font-medium">{data.endDate || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Illness</label>
                <p className="font-medium">{data.illness || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Medicine</label>
                <p className="font-medium">{data.medicine || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Other Medicine</label>
                <p className="font-medium">{data.otherMedicine || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Remarks</label>
                <p className="font-medium">{data.remarks || "-"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}