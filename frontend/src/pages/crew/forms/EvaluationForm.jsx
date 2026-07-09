// src/pages/crew/forms/EvaluationForm.jsx
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadCloud,ChevronDown, X, File, CheckCircle } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";

// ===== SHIP NAME OPTIONS =====
const SHIP_NAME_OPTIONS = [
  "ORIENTAL STAR",
  "FROM K",
  "HI CREST",
  "DDS MARINA",
  "CS CRYSTAL",
  "ORIENTAL ENTERPRISE",
  "EASTERN DREAM",
  "EASTERN VENUS",
  "ORIENTAL FRONTIER",
  "OCEAN LEADER",
  "OCEAN PRIDE 1",
  "SUN RIO",
  "SUN STAR",
  "WOORI SUN",
  "WOORI SKY",
  "HS GLORY",
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function EvaluationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    date: "",
    shipping: "",
    performanceEvaluation: "",
  });

  // ===== File Upload States =====
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== FILE UPLOAD HANDLER =====
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['png', 'jpeg', 'jpg', 'pdf'];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Please upload .png, .jpeg, or .pdf files only!');
      event.target.value = '';
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 5MB!');
      event.target.value = '';
      return;
    }

    // Start upload simulation
    setIsUploading(true);
    setUploadedFile(file);
    setFileName(file.name);
    setUploadProgress(0);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsUploading(false);
        setIsUploaded(true);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 200);
  };

  // ===== REMOVE FILE =====
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ===== FORMAT FILE SIZE =====
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSave = async () => {
    try {
      console.log("Saving evaluation:", { ...formData, file: uploadedFile });
      // Add your API call here
      navigate(`/crew/${id}`);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  const crewLabel = t("evaluation") || "Evaluation";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
            <h2 className="text-[17px] font-medium text-[#3C5065]">
              {t("evaluation") || "Evaluation"}
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              {/* Date */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel>
                  {t("date") || "Date"}
                </FieldLabel>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Shipping - Select Box */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel>
                  {t("shipping") || "Shipping"}
                </FieldLabel>
                <div className="relative">
                  <select
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleChange}
                    className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  >
                    <option value="">
                      {t("select_shipping") || "Select Shipping..."}
                    </option>
                    {SHIP_NAME_OPTIONS.map((ship) => (
                      <option key={ship} value={ship}>
                        {ship}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
                </div>
              </div>

              {/* Performance Evaluation - Full Width */}
              <div className="flex flex-col gap-2.5 md:col-span-2">
                <FieldLabel>
                  {t("performance_evaluation") || "Performance Evaluation"}
                </FieldLabel>
                <textarea
                  name="performanceEvaluation"
                  value={formData.performanceEvaluation}
                  onChange={handleChange}
                  placeholder={t("enter_performance_evaluation") || "Lorem ipsum dolor sit amet consectetur."}
                  rows={4}
                  className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>
            </div>

            {/* ===== Attachment ===== */}
            <div className="mt-7 flex flex-col gap-2.5">
              <FieldLabel>
                {t("attachment") || "Attachment"}
              </FieldLabel>
              
              {/* File Upload Area */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".png,.jpeg,.jpg,.pdf"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-[#3C5065] px-4 py-1.5 text-xs font-semibold text-[#3C5065] hover:bg-slate-50 transition-colors"
                >
                  <UploadCloud className="h-4 w-4" />
                  {t("choose_file") || "Choose File"}
                </label>
                <span className="text-sm text-[#9CA3AF]">
                  {fileName || t("no_file_chosen") || "No file chosen"}
                </span>
              </div>

              {/* Upload Progress - Show when file is uploaded */}
              {uploadedFile && (
                <div className="mt-2 flex flex-col gap-2.5 rounded-lg border border-[#EAECF0] bg-white p-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                        isUploaded ? 'bg-green-500' : 'bg-[#315888]'
                      }`}>
                        {isUploaded ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <File className="h-5 w-5 text-white" />
                        )}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#293056]">
                          {uploadedFile.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#9CA3AF]">
                          <span>File Size: {formatFileSize(uploadedFile.size)}</span>
                          {isUploaded && (
                            <span className="text-green-500">✓ Uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      aria-label="Remove file"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAECF0] text-[#667085] hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-[7px] w-full overflow-hidden rounded-full bg-[#E1EFFE]">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#1570EF] to-[#2E90FA] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  
                  {/* Progress Text */}
                  <div className="flex justify-between text-xs text-[#667085]">
                    <span>
                      {isUploading ? 'Uploading...' : isUploaded ? 'Upload complete!' : 'Ready'}
                    </span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-5">
            <button
              onClick={handleCancel}
              className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={handleSave}
              className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
            >
              {t("save") || "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}