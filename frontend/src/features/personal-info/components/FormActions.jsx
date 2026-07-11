// src/features/personal-info/components/FormActions.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function FormActions({
  isEditing,
  isLoading,
  onSave,
  onCancel,
}) {
  const { t } = useLanguage();

  if (!isEditing) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-end gap-4 p-6 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="rounded-md border border-gray-200 bg-white px-8 py-2.5 text-sm text-[#3C5065] hover:bg-slate-50 disabled:opacity-50 transition-colors"
          disabled={isLoading}
        >
          {t("cancel") || "Cancel"}
        </button>
        <button
          onClick={onSave}
          className="rounded-md bg-[#002F67] px-10 py-2.5 text-sm font-medium text-white hover:bg-[#00397e] disabled:opacity-50 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : t("save") || "Save"}
        </button>
      </div>
    </div>
  );
}