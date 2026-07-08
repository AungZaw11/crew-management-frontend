// src/components/crew/SubHeader.jsx
import React from "react";
import { ArrowLeft, Upload, PlusCircle } from "lucide-react";

export function SubHeader({
  breadcrumb,
  onBack,
  onAddNew,
  showAddNew = false, // ← Default က false ထားပါ
  crewLabel = "",
  isNew = false,
}) {
  const inCreate = !!breadcrumb;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-6 py-3 md:px-10">
      <div className="flex items-center gap-4 md:gap-6">
        <button
          aria-label="Go back"
          onClick={onBack}
          className="text-[#3C5065] hover:text-gray-900"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
        </button>
        <h1 className="text-base font-medium text-[#3C5065]">
          {isNew ? "New Person" : crewLabel}
          {inCreate && (
            <>
              {" \\ "}
              <span className="font-semibold text-[#171A1F]">{breadcrumb}</span>
            </>
          )}
        </h1>
      </div>

      {!inCreate && showAddNew && (
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-md border border-[#3B6598] bg-white px-4 py-2 text-sm text-[#3C5065] transition-colors hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 rounded-md border border-[#002F67] bg-[#002F67] px-4 py-2 text-sm text-white transition-colors hover:bg-[#00397e]"
          >
            <PlusCircle className="h-4 w-4" />
            Add New
          </button>
        </div>
      )}

      {/* ===== Export only (no Add New) ===== */}
      {!inCreate && !showAddNew && (
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-md border border-[#3B6598] bg-white px-4 py-2 text-sm text-[#3C5065] transition-colors hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            Export
          </button>
        </div>
      )}
    </div>
  );
}
