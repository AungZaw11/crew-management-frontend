// src/features/crew/pages/CrewDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, User, Anchor } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import { useCrewDetail } from "../hooks/useCrewDetail";
import { useCrewList } from "../hooks/useCrewList";
import CrewStatusBadge from "../components/CrewStatusBadge";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

export default function CrewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { crew, isLoading, error, deleteCrew } = useCrewDetail(id);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/crew")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t("back_to_list") || "Back to List"}
        </button>
      </div>
    );
  }

  if (!crew) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("crew_not_found") || "Crew member not found"}</p>
        <button
          onClick={() => navigate("/crew")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t("back_to_list") || "Back to List"}
        </button>
      </div>
    );
  }

  const handleDelete = async () => {
    await deleteCrew();
    navigate("/crew");
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/crew")}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {crew.name_eng || crew.name_kor || "Crew Member"}
            </h1>
            <p className="text-sm text-gray-500">{crew.crew_code}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/crew/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            <Edit size={16} />
            {t("edit") || "Edit"}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm"
          >
            <Trash2 size={16} />
            {t("delete") || "Delete"}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              {t("confirm_delete") || "Confirm Delete"}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("confirm_delete_message") || "Are you sure you want to delete this crew member?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t("cancel") || "Cancel"}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {t("delete") || "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {crew.avatar ? (
                  <img src={crew.avatar} alt={crew.name_eng} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t("crew_code") || "Crew Code"}</p>
                <p className="font-medium">{crew.crew_code}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("rank") || "Rank"}</p>
                <p className="font-medium">{crew.rank || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("vessel") || "Vessel"}</p>
                <p className="font-medium">{crew.vessel || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("status") || "Status"}</p>
                <CrewStatusBadge status={crew.status} size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {t("contact_info") || "Contact Information"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("email") || "Email"}</p>
                <p className="font-medium">{crew.email || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("phone") || "Phone"}</p>
                <p className="font-medium">{crew.phone || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("mobile") || "Mobile"}</p>
                <p className="font-medium">{crew.mobile || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">{t("address") || "Address"}</p>
                <p className="font-medium">{crew.address || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t("personal_details") || "Personal Details"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t("birth_date") || "Birth Date"}</p>
              <p className="font-medium">{crew.birth_date || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("nationality") || "Nationality"}</p>
              <p className="font-medium">{crew.nationality || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("hire_date") || "Hire Date"}</p>
              <p className="font-medium">{crew.hire_date || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("religion") || "Religion"}</p>
              <p className="font-medium">{crew.religion || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}