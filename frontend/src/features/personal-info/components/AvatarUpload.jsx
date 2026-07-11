// src/features/personal-info/components/AvatarUpload.jsx
import React, { useRef } from "react";
import { User, Upload, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import toastHelper from "../../../utils/toastHelper";

export default function AvatarUpload({
  avatarPreview,
  isEditing,
  onFileUpload,
  onRemoveAvatar,
}) {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toastHelper.error('Only JPG, PNG, JPEG, and WEBP files are allowed!');
      event.target.value = '';
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toastHelper.error('File size must be less than 5MB!');
      event.target.value = '';
      return;
    }

    // Valid file
    onFileUpload(file);
  };

  const handleRemove = () => {
    onRemoveAvatar();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-[162px] w-[140px] items-center justify-center rounded bg-gray-200 overflow-hidden">
        {avatarPreview ? (
          <img 
            src={avatarPreview} 
            alt="Avatar" 
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-16 w-16 text-gray-400" />
        )}
        {isEditing && avatarPreview && (
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {isEditing && (
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="flex items-center gap-2 rounded-md border border-[#3C5065] px-4 py-1.5 text-xs font-semibold text-[#3C5065] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <Upload className="w-3 h-3" />
            {t("choose_file") || "Choose File"}
          </label>
          <p className="text-[10px] text-gray-400">
            JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>
      )}
    </div>
  );
}