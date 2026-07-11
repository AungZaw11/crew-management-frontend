// src/features/qualification/components/FormActions.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function FormActions({
  isEditing,
  isLoading,
  onSave,
  onCancel,
}) {
  const { t } = useLanguage();

  return (
    <div className="mt-8 flex items-center justify-end gap-5">
      <button
        onClick={onCancel}
        className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50 disabled:opacity-50 transition-colors"
        disabled={isLoading}
      >
        {t("cancel") || "Cancel"}
      </button>
      <button
        onClick={onSave}
        className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e] disabled:opacity-50 transition-colors"
        disabled={isLoading}
      >
        {isLoading
          ? "Saving..."
          : isEditing
          ? t("update") || "Update"
          : t("save") || "Save"}
      </button>
    </div>
  );
}