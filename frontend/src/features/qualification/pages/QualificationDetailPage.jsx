// src/features/qualification/pages/QualificationDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQualificationById } from "../services/qualificationSlice";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

export default function QualificationDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { selectedQualification, isLoading } = useSelector((state) => state.qualification);

  useEffect(() => {
    if (id) {
      dispatch(fetchQualificationById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
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
          onClick={() => navigate(`/crew/${crewId}`)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t("back") || "Back"}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/crew/${crewId}`)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {t("qualification_details") || "Qualification Details"}
        </h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t("certificate_name") || "Certificate Name"}</p>
              <p className="font-medium">{selectedQualification.certificateName || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("license_number") || "License Number"}</p>
              <p className="font-medium">{selectedQualification.licenseNumber || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("expire_date") || "Expire Date"}</p>
              <p className="font-medium">{selectedQualification.expireDate || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("status") || "Status"}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedQualification.status === "Active" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {selectedQualification.status || "Active"}
              </span>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">{t("remarks") || "Remarks"}</p>
              <p className="font-medium">{selectedQualification.remarks || "-"}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => navigate(`/crew/${crewId}/qualification/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Edit size={16} />
            {t("edit") || "Edit"}
          </button>
          <button
            onClick={() => {
              // Delete logic
              navigate(`/crew/${crewId}`);
            }}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
            {t("delete") || "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}