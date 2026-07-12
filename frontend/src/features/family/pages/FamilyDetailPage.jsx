// src/features/family/pages/FamilyDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFamilyById } from "../services/familySlice";
import { fetchCrewById } from "../../crew/services/crewSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SubHeader from "../../crew/components/SubHeader";
import { User, Calendar, Phone, MapPin, FileText } from "lucide-react";

export default function FamilyDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { selectedFamily, isLoading: isFamilyLoading } = useSelector((state) => state.family);
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);

  useEffect(() => {
    if (crewId) {
      dispatch(fetchCrewById(crewId));
    }
  }, [dispatch, crewId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFamilyById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  const handleEdit = () => {
    navigate(`/crew/${crewId}/family/${id}/edit`);
  };

  if (isFamilyLoading || isCrewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedFamily) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("not_found") || "Family member not found"}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t("back") || "Back"}
        </button>
      </div>
    );
  }

  const crewName = selectedCrew?.name_eng || selectedCrew?.name_kor || "";
  const crewCode = selectedCrew?.crew_code || "";
  const crewRank = selectedCrew?.rank || "";
  const vesselName = selectedCrew?.vessel || "";

  const subHeaderLabel = `${crewName}${crewCode ? ` [${crewCode}]` : ''}${crewRank ? ` - ${crewRank}` : ''}${vesselName ? ` - ${vesselName}` : ''} \\ ${t("family") || "Family"}`;

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={subHeaderLabel}
        showAddNew={false}
        showEdit={true}
        onEdit={handleEdit}
        isEditMode={false}
        crewName={crewName}
        crewCode={crewCode}
        crewRank={crewRank}
        vesselName={vesselName}
        activeTabLabel={t("family") || "Family"}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="rounded-md border border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              
              {/* ===== LEFT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Name */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("name") || "Name"}
                  </label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedFamily.name || "-"}
                    </p>
                  </div>
                </div>

                {/* Relation */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("relation") || "Relation"}
                  </label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block w-fit ${
                    selectedFamily.relation === "Father" 
                      ? "bg-blue-100 text-blue-700" 
                      : selectedFamily.relation === "Mother"
                      ? "bg-pink-100 text-pink-700"
                      : selectedFamily.relation === "Spouse"
                      ? "bg-purple-100 text-purple-700"
                      : selectedFamily.relation === "Brother"
                      ? "bg-green-100 text-green-700"
                      : selectedFamily.relation === "Sister"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {selectedFamily.relation || "-"}
                  </span>
                </div>

                {/* Birth */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("birth") || "Birth"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedFamily.birth || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Phone */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("phone") || "Phone"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedFamily.phone || "-"}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("address") || "Address"}
                  </label>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#315888] mt-0.5" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedFamily.address || "-"}
                    </p>
                  </div>
                </div>

                {/* Remarks */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("remarks") || "Remarks"}
                  </label>
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#315888] mt-0.5" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedFamily.remarks || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}