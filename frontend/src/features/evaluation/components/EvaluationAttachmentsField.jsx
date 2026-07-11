// src/features/evaluation/components/EvaluationAttachmentsField.jsx
import React from "react";
import { Upload, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function EvaluationAttachmentsField({ value, onChange, error }) {
  const { t } = useLanguage();
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...fileList]);
    if (onChange) {
      onChange({
        target: {
          name: "attachments",
          value: fileList,
        },
      });
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel>{t("attachments") || "Attachments"}</FieldLabel>
      
      {/* Upload Area */}
      <div className="relative flex min-h-[80px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-[#FBFDFF] px-4 py-4 transition-colors hover:border-[#002F67]">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="mb-1 h-6 w-6 text-[#3C5065]" />
        <p className="text-center text-xs text-[#3C5065]">
          {t("upload_files") || "Click to upload files"}
        </p>
        <p className="text-center text-xs text-gray-400">
          {t("supported_file_types") || "Supported: .png, .jpeg, .pdf, .csv"}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#3C5065]">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="rounded-full p-1 text-red-500 hover:bg-red-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}