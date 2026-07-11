// src/features/crew/components/SubHeader.jsx
import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function SubHeader({
  onBack,
  isNew = false,
  crewLabel = "New Person",
  showAddNew = false,
  onAddNew,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          {isNew ? t("add_crew") || "Add Crew" : crewLabel}
        </h1>
      </div>

      {showAddNew && (
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t("add_new") || "Add New"}
        </button>
      )}
    </div>
  );
}