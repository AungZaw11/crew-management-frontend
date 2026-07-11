// src/features/evaluation/pages/EvaluationListPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { fetchEvaluations, deleteEvaluation } from "../services/evaluationSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import toastHelper from "../../../utils/toastHelper";

export default function EvaluationListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { evaluations, isLoading } = useSelector((state) => state.evaluation);

  useEffect(() => {
    dispatch(fetchEvaluations());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete this evaluation?")) {
      try {
        await dispatch(deleteEvaluation(id)).unwrap();
        toastHelper.success(t("evaluation_deleted") || "Evaluation deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete evaluation");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("evaluations") || "Evaluations"}
        </h1>
        <button
          onClick={() => navigate("/crew/evaluation/new")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          {t("add_evaluation") || "Add Evaluation"}
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
                  {t("date") || "Date"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("evaluator") || "Evaluator"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("period") || "Period"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("overall_rating") || "Overall"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  {t("technical_rating") || "Technical"}
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {evaluations?.length > 0 ? (
                evaluations.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.evaluator}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.period}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.overallRating} / 5</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.technicalRating} / 5</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/crew/evaluation/${item.id}`)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mr-2"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/crew/evaluation/${item.id}/edit`)}
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
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    {t("no_evaluations") || "No evaluations found"}
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