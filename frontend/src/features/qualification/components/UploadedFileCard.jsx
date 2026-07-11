// src/features/qualification/components/UploadedFileCard.jsx
import React from "react";
import { UploadCloud, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function UploadedFileCard({ file, onFileRemove }) {
  const { t } = useLanguage();

  if (!file) return null;

  const fileSize = (file.size / (1024 * 1024)).toFixed(2);
  const fileExtension = file.name.split('.').pop().toUpperCase();

  return (
    <div className="mt-2 flex flex-col gap-2.5 rounded-lg border border-[#EAECF0] bg-white p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#315888]">
            <UploadCloud className="h-5 w-5 text-white" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#293056]">
              {t("personal_certificate") || "Personal Certificate"}
            </span>
            <div className="flex items-center gap-3 text-xs font-medium text-[#9CA3AF]">
              <span>
                {t("file_format") || "File Format"}: {fileExtension}
              </span>
              <span>
                {t("file_size") || "File Size"}: {fileSize}MB
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onFileRemove}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAECF0] text-[#667085] hover:bg-gray-50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="h-[7px] w-full overflow-hidden rounded-full bg-[#E1EFFE]">
        <div className="h-full w-[62%] rounded-full bg-[#2E90FA]" />
      </div>
    </div>
  );
}