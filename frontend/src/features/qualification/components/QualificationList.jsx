// src/features/qualification/components/QualificationList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function QualificationList({ 
  qualifications = [], 
  crewId,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (qualifications.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">
          {t("no_qualifications") || "No qualifications added yet"}
        </p>
        <button
          onClick={() => navigate(`/crew/${crewId}/qualification/new`)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mx-auto"
        >
          <Plus size={16} />
          {t("add_qualification") || "Add Qualification"}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("qualifications") || "Qualifications"}
        </h3>
        <button
          onClick={() => navigate(`/crew/${crewId}/qualification/new`)}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={14} />
          {t("add_new") || "Add New"}
        </button>
      </div>

      <div className="space-y-3">
        {qualifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800">
                  {item.certificateName}
                </span>
                <span className="text-sm text-gray-500">
                  {item.licenseNumber}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.status === "Active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {item.status || "Active"}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {t("expire_date") || "Expire"}: {item.expireDate || "-"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onView?.(item.id)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title={t("view") || "View"}
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => onEdit?.(item.id)}
                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                title={t("edit") || "Edit"}
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete?.(item.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title={t("delete") || "Delete"}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}