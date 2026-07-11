// src/features/qualification/pages/QualificationListPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { fetchQualifications, deleteQualification } from "../services/qualificationSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import toastHelper from "../../../utils/toastHelper";

export default function QualificationListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { qualifications, isLoading } = useSelector((state) => state.qualification);

  useEffect(() => {
    dispatch(fetchQualifications());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete this qualification?")) {
      try {
        await dispatch(deleteQualification(id)).unwrap();
        toastHelper.success(t("qualification_deleted") || "Qualification deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete qualification");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("qualifications") || "Qualifications"}
        </h1>
        <button
          onClick={() => navigate("/crew/qualification/new")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          {t("add_qualification") || "Add Qualification"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("certificate_name") || "Certificate Name"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("license_number") || "License Number"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("expire_date") || "Expire Date"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {qualifications?.length > 0 ? (
                qualifications.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.certificateName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.licenseNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.expireDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : item.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/crew/qualification/${item.id}`)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mr-2"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/crew/qualification/${item.id}/edit`)}
                        className="p-1 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors mr-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    {t("no_qualifications") || "No qualifications found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}