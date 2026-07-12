// src/features/qualification/components/QualificationTable.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import QualificationTableHeader from "./QualificationTableHeader";
import QualificationTableRow from "./QualificationTableRow";

export default function QualificationTable({
  data,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-gray-100 border-t border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">
          {t("no_qualifications") || "No qualifications found"}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <QualificationTableHeader />
          <tbody>
            {data.map((item, index) => (
              <QualificationTableRow
                key={item.id || index}
                item={item}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
        {t("showing") || "Showing"} {data.length} {t("qualifications") || "qualifications"}
      </div>
    </div>
  );
}