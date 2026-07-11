// src/features/crew/components/SubHeader/index.jsx
import React from "react";
import { ArrowLeft, Upload, PlusCircle } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ==================== SUB COMPONENTS ====================

// Back Button
function BackButton({ onBack }) {
  const { t } = useLanguage();
  return (
    <button
      aria-label={t("back") || "Go back"}
      onClick={onBack}
      className="text-[#3C5065] hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="h-[18px] w-[18px]" />
    </button>
  );
}

// Title
function Title({ isNew, crewLabel, breadcrumb }) {
  const { t } = useLanguage();
  const newPersonLabel = t("new_person") || "New Person";
  const inCreate = !!breadcrumb;

  return (
    <h1 className="text-base font-medium text-[#3C5065]">
      {isNew ? newPersonLabel : crewLabel}
      {inCreate && (
        <>
          {" \\ "}
          <span className="font-semibold text-[#171A1F]">{breadcrumb}</span>
        </>
      )}
    </h1>
  );
}

// Action Buttons
function ActionButtons({ onAddNew, showAddNew, showExport = true }) {
  const { t } = useLanguage();
  const exportLabel = t("export") || "Export";
  const addNewLabel = t("add_new") || "Add New";

  return (
    <div className="flex items-center gap-4">
      {/* Export Button */}
      {showExport && (
        <button className="flex items-center gap-2 rounded-md border border-[#3B6598] bg-white px-4 py-2 text-sm text-[#3C5065] transition-colors hover:bg-slate-50">
          <Upload className="h-4 w-4" />
          {exportLabel}
        </button>
      )}

      {/* Add New Button */}
      {showAddNew && (
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 rounded-md border border-[#002F67] bg-[#002F67] px-4 py-2 text-sm text-white transition-colors hover:bg-[#00397e]"
        >
          <PlusCircle className="h-4 w-4" />
          {addNewLabel}
        </button>
      )}
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export function SubHeader({
  breadcrumb,
  onBack,
  onAddNew,
  showAddNew = false,
  crewLabel = "",
  isNew = false,
  showExport = true,
}) {
  const inCreate = !!breadcrumb;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-6 py-3 md:px-10">
      {/* Left Section */}
      <div className="flex items-center gap-4 md:gap-6">
        <BackButton onBack={onBack} />
        <Title 
          isNew={isNew} 
          crewLabel={crewLabel} 
          breadcrumb={breadcrumb} 
        />
      </div>

      {/* Right Section */}
      {!inCreate && (
        <ActionButtons 
          onAddNew={onAddNew}
          showAddNew={showAddNew}
          showExport={showExport}
        />
      )}
    </div>
  );
}