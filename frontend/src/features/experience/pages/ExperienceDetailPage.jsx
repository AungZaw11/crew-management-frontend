// src/features/experience/pages/ExperienceDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import SubHeader from "../../crew/components/SubHeader";
import { fetchExperienceById } from "../services/experienceSlice";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { 
  Calendar, 
  Building2, 
  Ship, 
  User, 
  MapPin, 
  Anchor,
  Clock,
  FileText,
  ArrowLeft
} from "lucide-react";

export default function ExperienceDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  const { selectedExperience, isLoading: isFetching } = useSelector(
    (state) => state.experience || { selectedExperience: null, isLoading: false }
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchExperienceById(id)).unwrap();
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/crew/${crewId}/experience`);
  };

  const handleEdit = () => {
    navigate(`/crew/${crewId}/experience/${id}/edit`);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedExperience) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Experience record not found</p>
        <button 
          onClick={handleBack} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to List
        </button>
      </div>
    );
  }

  const data = selectedExperience;

  // Info card component
  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="mt-0.5">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel="Experience Details"
        showEdit={true}
        onEdit={handleEdit}
        showAddNew={false}
      />

      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {data.company || "Unknown Company"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {data.shipName || data.ship || "Unknown Ship"} • {data.rank || "Unknown Rank"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  data.status === "Active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {data.status || "Completed"}
                </span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <InfoItem 
              icon={Building2} 
              label="Company" 
              value={data.company} 
            />
            <InfoItem 
              icon={Ship} 
              label="Ship Name" 
              value={data.shipName || data.ship} 
            />
            <InfoItem 
              icon={User} 
              label="Rank" 
              value={data.rank} 
            />
            <InfoItem 
              icon={Calendar} 
              label="Boarding Date" 
              value={data.boardingDate} 
            />
            <InfoItem 
              icon={Calendar} 
              label="Leaving Date" 
              value={data.leavingDate} 
            />
            <InfoItem 
              icon={MapPin} 
              label="Area" 
              value={data.area} 
            />
            <InfoItem 
              icon={Anchor} 
              label="Ship Type" 
              value={data.shipType} 
            />
            <InfoItem 
              icon={Clock} 
              label="Board" 
              value={data.board || data.boardLeave} 
            />
            <InfoItem 
              icon={Clock} 
              label="Leave" 
              value={data.leave || data.boardLeave} 
            />
          </div>

          {/* Additional Info */}
          {(data.grt || data.kw || data.remarks) && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.grt && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">GRT</p>
                    <p className="text-sm font-medium text-gray-800">{data.grt}</p>
                  </div>
                )}
                {data.kw && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">KW</p>
                    <p className="text-sm font-medium text-gray-800">{data.kw}</p>
                  </div>
                )}
                {data.remarks && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Remarks</p>
                    <p className="text-sm text-gray-800">{data.remarks}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}   