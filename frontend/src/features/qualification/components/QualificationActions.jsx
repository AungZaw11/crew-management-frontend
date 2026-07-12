// src/features/qualification/components/QualificationActions.jsx
import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function QualificationActions({
  item,
  onEdit,
  onDelete,
  onView,
}) {
  const { t } = useLanguage();

  return (
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
  );
}