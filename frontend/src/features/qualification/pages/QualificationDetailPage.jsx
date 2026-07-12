// src/features/qualification/pages/QualificationDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQualificationById } from "../services/qualificationSlice";
import { fetchCrewById } from "../../crew/services/crewSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SubHeader from "../../crew/components/SubHeader";
import { Download, FileText } from "lucide-react";

export default function QualificationDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { selectedQualification, isLoading: isQualLoading } = useSelector((state) => state.qualification);
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);

  // ✅ Fetch Crew Data ကိုပါဆွဲမယ်
  useEffect(() => {
    if (crewId) {
      dispatch(fetchCrewById(crewId));
    }
  }, [dispatch, crewId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchQualificationById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  const handleEdit = () => {
    navigate(`/crew/${crewId}/qualification/${id}/edit`);
  };

  if (isQualLoading || isCrewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedQualification) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("not_found") || "Qualification not found"}</p>
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

  const subHeaderLabel = `${crewName}${crewCode ? ` [${crewCode}]` : ''}${crewRank ? ` - ${crewRank}` : ''}${vesselName ? ` - ${vesselName}` : ''} \\ ${t("qualification") || "Qualification"}`;

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* ✅ SubHeader - Crew Detail ပုံစံအတိုင်း */}
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={subHeaderLabel}
        showAddNew={false}
        showEdit={true}
        onEdit={handleEdit}
        isEditMode={false}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          {/* Form Body */}
          <div className="rounded-md border border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              
              {/* ===== LEFT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Certificate Name */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("certificate_name") || "Certificate Name"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.certificateName || "-"}
                  </p>
                </div>

                {/* Training Date */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("training_date") || "Training Date"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.trainingDate || "-"}
                  </p>
                </div>

                {/* Attach File */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("attach_file") || "Attach File"}
                  </label>
                  
                  {/* Certificate Card */}
                  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Certificate of Employment
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          This is to certify that
                        </p>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                          Stephen J. Martin
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          has been employed
                        </p>
                        <p className="text-xs text-gray-600">
                          Bethuside CBI Services for the Chantbloke, Inc.
                        </p>
                        <p className="text-xs text-gray-600">
                          Administrative Officer
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          from January 2019 to the present
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          This certification is being issued upon the request of the aforementioned
                          name for authorized lawful purposes if only service hours best.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Given this 14th day of June 2019 of Taung.
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-800">KEY QUOTE & ORDER</p>
                          <p className="text-xs text-gray-600">Executive Director</p>
                          <p className="text-xs text-gray-600">Chantbloke, Inc.</p>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            {t("print") || "Print"}
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            {t("sample") || "Sample"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Expiration */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("expiration") || "Expiration"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.expiration || "-"}
                  </p>
                </div>

                {/* Expire Date */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("expire_date") || "Expire Date"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.expireDate || "-"}
                  </p>
                </div>

                {/* Certificate Type */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("certificate_type") || "Certificate Type"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.certificateType || "Personal"}
                  </p>
                </div>

                {/* License Number */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("license_number") || "License Number"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.licenseNumber || "-"}
                  </p>
                </div>

                {/* Remarks */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("remarks") || "Remarks"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedQualification.remarks || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}