// src/features/qualification/components/QualificationTableRow.jsx
import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function QualificationTableRow({
  item,
  index,
  onEdit,
  onDelete,
  onView,
}) {
  const { t } = useLanguage();

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "Expired") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
    }`}>
      <td className="px-4 py-3 text-sm text-gray-600">
        {item.no || String(index + 1).padStart(2, "0")}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status || "Active")}`}>
          {item.expiration || item.status || "Active"}
        </span>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-800">
        {item.certificateName}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {item.trainingDate || "-"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {item.expireDate || "-"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {item.licenseNumber || "-"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {item.remarks || "-"}
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-1">
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
      </td>
    </tr>
  );
}