// src/features/qualification/components/PersonalCertificateCard.jsx
import React from "react";
import { File, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function PersonalCertificateCard({ file, onRemove }) {
    const { t } = useLanguage();

    if (!file) return null;

    const fileSize = (file.size / (1024 * 1024)).toFixed(2);
    const fileExtension = file.name.split('.').pop().toUpperCase();

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-[#FBFDFF] p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-[#002F67] text-white">
                    <File className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-medium text-[#3C5065]">{file.name}</p>
                    <p className="text-xs text-gray-400">
                        {t("file_format") || "File Format"}: {fileExtension} | {t("file_size") || "File Size"}: {fileSize}MB
                    </p>
                </div>
            </div>
            <button
                onClick={onRemove}
                className="rounded-full p-1 text-red-500 hover:bg-red-50 transition-colors"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}