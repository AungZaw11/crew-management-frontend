// src/features/family/pages/FamilyListPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { fetchFamilies, deleteFamily } from "../services/familySlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import toastHelper from "../../../utils/toastHelper";

export default function FamilyListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { families, isLoading } = useSelector((state) => state.family);

  useEffect(() => {
    dispatch(fetchFamilies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete this family member?")) {
      try {
        await dispatch(deleteFamily(id)).unwrap();
        toastHelper.success(t("family_deleted") || "Family member deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete family member");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("family_members") || "Family Members"}
        </h1>
        <button
          onClick={() => navigate("/crew/family/new")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          {t("add_family_member") || "Add Family Member"}
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
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("relation") || "Relation"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("birth") || "Birth"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("phone") || "Phone"}
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {families?.length > 0 ? (
                families.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.relation}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.birth || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.phone || "-"}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/crew/family/${item.id}`)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mr-2"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/crew/family/${item.id}/edit`)}
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
                    {t("no_family_members") || "No family members found"}
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