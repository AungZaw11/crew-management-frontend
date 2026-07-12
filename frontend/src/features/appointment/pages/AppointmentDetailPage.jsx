// src/features/appointment/pages/AppointmentDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentById } from "../services/appointmentSlice";
import { fetchCrewById } from "../../crew/services/crewSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SubHeader from "../../crew/components/SubHeader";
import { Calendar, MapPin, Ship, User } from "lucide-react";

export default function AppointmentDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { selectedAppointment, isLoading: isAppLoading } = useSelector((state) => state.appointment);
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);

  useEffect(() => {
    if (crewId) {
      dispatch(fetchCrewById(crewId));
    }
  }, [dispatch, crewId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  const handleEdit = () => {
    navigate(`/crew/${crewId}/appointment/${id}/edit`);
  };

  if (isAppLoading || isCrewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedAppointment) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("not_found") || "Appointment not found"}</p>
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

  const subHeaderLabel = `${crewName}${crewCode ? ` [${crewCode}]` : ''}${crewRank ? ` - ${crewRank}` : ''}${vesselName ? ` - ${vesselName}` : ''} \\ ${t("appointment") || "Appointment"}`;

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
        activeTabLabel={t("appointment") || "Appointment"}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="rounded-md border border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              
              {/* ===== LEFT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Division */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("deployment_division") || "Deployment Division"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedAppointment.division || "-"}
                  </p>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("deployment_content") || "Deployment Content"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedAppointment.content || "-"}
                  </p>
                </div>

                {/* Ship */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("ship_name") || "Ship's Name"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedAppointment.ship || "-"}
                    </p>
                  </div>
                </div>

                {/* Rank */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("rank") || "Rank"}
                  </label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedAppointment.rank || "-"}
                    </p>
                  </div>
                </div>

                {/* Boarding Date */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("boarding_date") || "Boarding Date"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedAppointment.boardingDate || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Leaving Date */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("leaving_date") || "Leaving Date"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedAppointment.leavingDate || "-"}
                    </p>
                  </div>
                </div>

                {/* Boarding Period */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("boarding_period") || "Boarding Period"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedAppointment.boardingPeriod || "-"}
                  </p>
                </div>

                {/* Place */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("place") || "Place"}
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedAppointment.place || "-"}
                    </p>
                  </div>
                </div>

                {/* Remarks */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("remarks") || "Remarks"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedAppointment.remarks || "-"}
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