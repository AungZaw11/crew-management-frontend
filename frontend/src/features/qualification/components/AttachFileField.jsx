// src/features/qualification/components/AttachFileField.jsx
import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import toastHelper from "../../../utils/toastHelper";

export default function AttachFileField({ onFileUpload, error }) {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (20MB)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      toastHelper.error('File size must be less than 20MB!');
      event.target.value = '';
      return;
    }

    // Validate file type
    const allowedExtensions = ['png', 'jpeg', 'jpg', 'pdf', 'csv'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toastHelper.error('Only PNG, JPEG, PDF, and CSV files are allowed!');
      event.target.value = '';
      return;
    }

    // ✅ onFileUpload က function ဖြစ်မှသာ ခေါ်ပါ
    if (typeof onFileUpload === 'function') {
      onFileUpload(file);
    } else {
      console.error("onFileUpload is not a function");
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-base font-medium text-[#315888]">
        {t("attach_file") || "Attach File"}
      </label>

      <div
        className={`relative flex min-h-[120px] w-full flex-col items-center justify-center rounded-md border-2 border-dashed ${
          error ? "border-red-500" : "border-gray-300"
        } bg-[#FBFDFF] px-4 py-6 transition-colors hover:border-[#002F67]`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".png,.jpeg,.jpg,.pdf,.csv"
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="mb-2 h-8 w-8 text-[#3C5065]" />
        <p className="text-center text-sm text-[#3C5065]">
          {t("upload_drag_drop") || "Upload or Drag and Drop your document file"}
        </p>
        <p className="mt-1 text-center text-xs text-gray-400">
          {t("max_file_size") || "Maximum File Size is 20MB"}
        </p>
        <p className="text-center text-xs text-gray-400">
          {t("supported_file_types") || "Supported File Types are .png, .jpeg, .pdf, .csv"}
        </p>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}