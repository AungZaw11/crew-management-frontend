// src/features/replacement/pages/ReplacementDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReplacementById } from "../services/replacementSlice";
import { fetchCrewById } from "../../crew/services/crewSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SubHeader from "../../crew/components/SubHeader";

export default function ReplacementDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { selectedReplacement, isLoading: isRepLoading } = useSelector((state) => state.replacement);
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);

  useEffect(() => {
    if (crewId) {
      dispatch(fetchCrewById(crewId));
    }
  }, [dispatch, crewId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReplacementById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  const handleEdit = () => {
    navigate(`/crew/${crewId}/replacement/${id}/edit`);
  };

  if (isRepLoading || isCrewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedReplacement) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("not_found") || "Replacement not found"}</p>
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

  const subHeaderLabel = `${crewName}${crewCode ? ` [${crewCode}]` : ''}${crewRank ? ` - ${crewRank}` : ''}${vesselName ? ` - ${vesselName}` : ''} \\ ${t("replacement") || "Replacement"}`;

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
        activeTabLabel={t("replacement") || "Replacement"}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="rounded-md border border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("deployment_division") || "Deployment Division"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.division || "-"}</p>
                </div>
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("deployment_content") || "Deployment Content"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.content || "-"}</p>
                </div>
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("ship_name") || "Ship's Name"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.ship || "-"}</p>
                </div>
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("rank") || "Rank"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.rank || "-"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("date") || "Date"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.date || "-"}</p>
                </div>
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("place") || "Place"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.place || "-"}</p>
                </div>
                <div>
                  <label className="text-base font-medium text-[#315888]">{t("remarks") || "Remarks"}</label>
                  <p className="text-sm text-[#3C5065]">{selectedReplacement.remarks || "-"}</p>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => navigate(`/crew/${crewId}/replacement/${id}/deploy`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {t("deploy") || "Deploy"}
                  </button>
                  <button
                    onClick={() => navigate(`/crew/${crewId}/replacement/${id}/send`)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {t("send") || "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}