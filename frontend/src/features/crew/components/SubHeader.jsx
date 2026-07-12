// src/features/crew/components/SubHeader.jsx
import React from "react";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function SubHeader({
  onBack,
  isNew = false,
  crewLabel = "New Person",
  showAddNew = false,
  onAddNew,
  showDelete = false,
  onDelete,
  showEdit = false,
  onEdit,
  isEditMode = false,
  crewName = "",
  crewCode = "",
  crewRank = "",
  vesselName = "",
  activeTabLabel = "",
  buttonType = "edit", // "edit" | "add"
  onAdd = null,
  addLabel = "",
}) {
  const { t } = useLanguage();

  const getSubHeaderLabel = () => {
    if (isNew) {
      return t("add_crew") || "Add Crew";
    }
    
    if (crewName) {
      let label = crewName;
      if (crewCode) label += ` [${crewCode}]`;
      if (crewRank) label += ` - ${crewRank}`;
      if (vesselName) label += ` - ${vesselName}`;
      if (activeTabLabel) label += ` \\ ${activeTabLabel}`;
      return label;
    }
    
    return crewLabel;
  };

  const displayLabel = getSubHeaderLabel();

  // ✅ Add button ကို ဘယ်လိုပြမလဲ ဆုံးဖြတ်ပါ
  const shouldShowAddButton = () => {
    // buttonType က "add" ဖြစ်ပြီး onAdd ရှိရင် ပြမယ်
    if (buttonType === "add" && onAdd) {
      return true;
    }
    // ဒါမှမဟုတ် showAddNew က true ဖြစ်ပြီး onAddNew ရှိရင် ပြမယ်
    if (showAddNew && onAddNew) {
      return true;
    }
    return false;
  };

  const handleAddClick = () => {
    if (buttonType === "add" && onAdd) {
      onAdd();
    } else if (showAddNew && onAddNew) {
      onAddNew();
    }
  };

  const getAddButtonLabel = () => {
    if (buttonType === "add" && addLabel) {
      return addLabel;
    }
    return t("add_new") || "Add New";
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 truncate max-w-3xl">
          {displayLabel}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Edit Button */}
        {buttonType === "edit" && showEdit && !isEditMode && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            {t("edit") || "Edit"}
          </button>
        )}

        {shouldShowAddButton() && (
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            {getAddButtonLabel()}
          </button>
        )}

        {/* Delete Button */}
        {showDelete && (
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            {t("delete") || "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}