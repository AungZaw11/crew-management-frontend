// src/components/crew/QualificationCreateForm.jsx
import React, { useState, useRef } from "react";
import { ChevronDown, Calendar, UploadCloud, X, File, CheckCircle, Eye } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

// ===== CERTIFICATE OPTIONS =====
const CERTIFICATE_OPTIONS = [
  "(BZ) Certificate Of Endorsement",
  "(BZ) Certificate Of Endorsement (GMDSS)",
  "(CN) Certificate of Competency",
  "(CN) ID CARD",
  "(CN) Medical",
  "(CN) Special training for seafarers on passenger ship",
  "(GM) Certificate Of Endorsement",
  "(GM) Certificate Of Endorsement (GMDSS)",
  "(GM) Certificate Of Endorsement (SSO)",
  "(ID) Certificate of Competency",
  "(ID) Certificate Of Endorsement",
  "(ID) Dangerous Hazardous Harmful Cargoes(IMDG Code) Training Programme",
  "(ID) Food Handling",
  "(ID) Food Safety",
  "(ID) GMDSS Radio Operator",
  "(ID) International Safety Management Code",
  "(KM) Certificate Of Endorsement",
  "(KM) Certificate Of Endorsement (GMDSS)",
  "(KM) Certificate Of Endorsement (SSO)",
  "(KR) 당직부원/Certificate of Qualification Watchkeeping",
  "(KR) 선박안전관리자/Shipboard Safety Officer",
  "(KR) 승무자격증(한국면허) / COE for COC",
  "(KR) 오염방지관리인/Marine pollution prevention course",
  "(KR) 원양선직무교육 (항해/기관) / Competence Training for Master and chief mates",
  "(KR) 유능부원/Able Ratings (II/5, III/5)",
  "(KR) 유해액체관리인/Marine pollution prevention course (Chemical)",
  "(KR) 자격증 - 구명정수/Certificate - Survival Craft and Rescue boat",
  "(KR) 자격증 - 기초탱커 승무자격증/Certificate - Basic Oil/Chemical Tanker",
  "(KR) 자격증 - 상급 유조선/Certificate - Advanced Oil Tanker",
  "(KR) 자격증 - 상급 케미칼 탱커/Certificate - Advanced Chemical Tanker",
  "(KR) 자격증 - 선박조리사/Certificate - Ship's Cook",
  "(KR) 자격증 - 의료관리자/Certificate - Medical Care",
  "(KR) 해사법규/Korea Maritime Law",
  "(MH) Certificate Of Endorsement",
  "(MH) Certificate Of Endorsement (GMDSS)",
  "(MM) Certificate Of Competency",
  "(MM) Efficient Deck Hand",
  "(MM) Electro Technical Rating",
  "(MM) High Voltage Management",
  "(MM) High Voltage Training",
  "(PH) Automatic Identification System",
  "(PH) Cargo Handling and Care of Cargo",
  "(PH) Certificate Of Competency",
  "(PH) Consolidated MARPOL 73/78 Course",
  "(PH) Dangerous Hazardous Harmful Cargoes",
  "(PH) Medical",
  "(PH) Proficiency in Survival Craft & Rescue Boat",
  "(PH) Ship Crane Operators Course",
  "(PH) Ship Security Awareness Training and Seafarers With Designated Security Duties",
  "(PN) Medical",
  "(PN) 당직부원/Certificate of Qualification Watchkeeping",
  "(PN) 선박보안교육(상급)/Ship security Officer Training",
  "(PN) 선박보안교육(중급)/Designated Security Duty",
  "(PN) 선박보안교육(초급)/Ship Security Awareness",
  "(PN) 선박조리사 인증/Ship Cook Endorsement",
  "(PN) 선박조리사/Ship's Cook Course",
  "(PN) 탱커기초교육/Basic Training for Oil and Chemical",
  "(PN) 탱커직무교육 (오일)/Advanced Training for Oil Tanker",
  "(PN) 탱커직무교육 (케미컬)/Advanced Training for Chemical Tanker",
  "(PN) 통신면허/Certificate of Competency (Radio)",
  "(PN) 파나마 해기면허/Certificate of Endorsement of Panama",
  "(PN)GOC-선원수첩 / SEAMAN BOOK",
  "(RU) ECDIS",
  "(RU) 당직부원",
  "(RU) 레이더(시뮬레이션)/Radar Simulation",
  "(RU) 레이더(알파)/Radar Simulation",
  "(RU)Certificate Of Competency",
  "(RU)Certificate Of Competency(Rdio)",
  "(STP) Certificate Of Endorsement",
  "(STP) Certificate Of Endorsement (GMDSS)",
  "(STP) Certificate Of Endorsement (SSO)",
  "Basic training for ro-ro passenger ships",
  "Bridge Resource Management Training",
  "근로계약서/Contract of Employment for Seafarer",
  "기초안전/Basic Safety Training",
  "당직부원/Watch Keeping",
  "레이더(시뮬레이션)/Radar Simulation",
  "레이더(알파)/Radar Arpa",
  "리더쉽 및 관리기술/Leadership and Managerial skill Training",
  "리더쉽 및 팀워크/Leadership and Teamwork Training (BRM/ERM)",
  "상급안전(구명)/Proficiency in Survival Craft & Rescue Boat",
  "상급안전(소화)/Advanced Fire-Fighting Training",
  "상급안전(응급)/Medical First Aid Training",
  "선박보안교육(상급)/Ship Security Officer Traing",
  "선박보안교육(상급)/Ship security Officer(RU)",
  "선박보안교육(중급)/Designated Security Duty",
  "선박보안교육(중급)/Designated Security Duty(RU)",
  "선박보안교육(초급)/Ship Security Awareness",
  "선박조리사교육/Ship's Cook",
  "선박조종시뮬레이션/Ship Handling Simulation",
  "선원등록증/SID",
  "선원수첩/Seaman Book (BHS)",
  "선원수첩/Seaman Book (CN)",
  "선원수첩/Seaman Book (ID)",
  "선원수첩/Seaman Book (KR)",
  "선원수첩/Seaman Book (MH)",
  "선원수첩/Seaman Book (MM)",
  "선원수첩/Seaman Book (PH)",
  "선원수첩/Seaman Book (RU)",
  "선원수첩/Seaman Book(PN)",
  "승선전 교육 이수증/Pre-Joining Education",
  "신체검사(마약알콜)/Drugs and Alcohol Test",
  "신체검사(케미컬)/Blood Test For Chemical Contamination",
  "신체검사(특수)/Medical",
  "안전관리자교육/Safety Officer Education",
  "여객선 직무교육/Passenger ship job training",
  "여객선기초교육/Passenger ship basic training",
  "여객선상급교육Passenger ship advanced retraining",
  "여권/Passport",
  "외국인 등록중",
  "유능부원/Able Seafarer II/5, III/5",
  "의료관리자/Medical Care Training",
  "전자기관부원/Electrical rating III/7",
  "전자해도(메이커교육)/ECDIS MAKER",
  "전자해도/ECDIS",
  "탱커기초/Basic Training for Oil and Chemical Tanker",
  "탱커직무교육(오일)/Advanced Training for Oil Tanker",
  "탱커직무교육(케미컬)/Advanced Training for Chemical Tanker",
  "통신면허(선원국)/GMDSS,Radio Certificate(seafarer's country)",
  "해기면허(선원국)/Certificate of Competency(seafarer's country)",
  "황열/Yellow Fever",
];

export function QualificationCreateForm({ onCancel, onSave }) {
  const { t } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [formData, setFormData] = useState({
    certificateName: "",
    expiration: "",
    trainingDate: "",
    expireDate: "",
    licenseNumber: "",
    remarks: "",
  });
  
  // ===== File Upload States =====
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCertificateChange = (e) => {
    setSelectedCertificate(e.target.value);
    setFormData((prev) => ({
      ...prev,
      certificateName: e.target.value,
    }));
  };

  // ===== FILE UPLOAD HANDLER =====
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf', 'text/csv'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['png', 'jpeg', 'jpg', 'pdf', 'csv'];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Please upload .png, .jpeg, .pdf, or .csv files only!');
      event.target.value = '';
      return;
    }

    // Validate file size (20MB)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 20MB!');
      event.target.value = '';
      return;
    }

    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Start upload simulation
    setIsUploading(true);
    setUploadedFile(file);
    setUploadProgress(0);
    setIsUploaded(false);

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
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    setPreviewUrl(null);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ===== TOGGLE PREVIEW =====
  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  // ===== GET FILE ICON =====
  const getFileIcon = () => {
    if (!uploadedFile) return <UploadCloud className="h-5 w-5 text-white" />;
    const ext = uploadedFile.name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <File className="h-5 w-5 text-white" />;
    if (['png', 'jpeg', 'jpg'].includes(ext)) return <File className="h-5 w-5 text-white" />;
    if (ext === 'csv') return <File className="h-5 w-5 text-white" />;
    return <File className="h-5 w-5 text-white" />;
  };

  // ===== GET FILE EXTENSION =====
  const getFileExtension = () => {
    if (!uploadedFile) return '';
    return uploadedFile.name.split('.').pop().toUpperCase();
  };

  // ===== FORMAT FILE SIZE =====
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ===== CHECK IF FILE IS IMAGE =====
  const isImageFile = () => {
    if (!uploadedFile) return false;
    return uploadedFile.type.startsWith('image/');
  };

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {t("new_qualification") || "New Qualification"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Certificate Name - Required - Select Box */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("certificate_name") || "Certificate Name"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="certificateName"
                  value={selectedCertificate}
                  onChange={handleCertificateChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_certificate") || "Select Certificate..."}
                  </option>
                  {CERTIFICATE_OPTIONS.map((cert) => (
                    <option key={cert} value={cert}>
                      {cert}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Expiration - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("expiration") || "Expiration"}
              </FieldLabel>
              <div className="relative">
                <input
                  name="expiration"
                  placeholder={t("enter_expiration") || "Expiration"}
                  value={formData.expiration}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Training Date - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("training_date") || "Training Date"}
              </FieldLabel>
              <div className="relative">
                <input
                  type="date"
                  name="trainingDate"
                  value={formData.trainingDate}
                  onChange={handleChange}
                  placeholder="2025-05-00"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3  pr-15 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
               
              </div>
            </div>

            {/* Expire Date - Required */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("expire_date") || "Expire Date"}
              </FieldLabel>
              <div className="relative">
                <input
                  type="date"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleChange}
                  placeholder="2025-05-00"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-15 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
               
              </div>
            </div>

            {/* Attach File - Required - WITH UPLOAD & PREVIEW */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("attach_file") || "Attach File"}
              </FieldLabel>
              
              {/* File Upload Area */}
              <div 
                className={`flex h-[147px] items-center justify-center gap-6 rounded-lg border-[3px] border-dashed px-6 cursor-pointer transition-colors ${
                  isUploaded ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-[#315888]'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".png,.jpeg,.jpg,.pdf,.csv"
                  className="hidden"
                />
                {isUploaded ? (
                  <CheckCircle className="h-8 w-8 shrink-0 text-green-500" />
                ) : (
                  <UploadCloud className="h-8 w-8 shrink-0 text-[#293056]" />
                )}
                <div className="flex flex-col gap-2 text-left">
                  <p className="text-sm font-semibold text-[#293056]">
                    {isUploaded 
                      ? t("file_uploaded") || "File uploaded successfully!"
                      : t("upload_drag_drop") || "Upload or Drag and Drop your document file"
                    }
                  </p>
                  <p className="text-xs font-semibold text-[#667085]">
                    {t("max_file_size") || "Maximum File Size is 20MB"}
                  </p>
                  <p className="text-xs text-[#667085]">
                    {t("supported_file_types") || "Supported File Types are .png, .jpeg, .pdf, .csv"}
                  </p>
                </div>
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
                          getFileIcon()
                        )}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#293056]">
                          {uploadedFile.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#9CA3AF]">
                          <span>File Format: {getFileExtension()}</span>
                          <span>File Size: {formatFileSize(uploadedFile.size)}</span>
                          {isUploaded && (
                            <span className="text-green-500">✓ Uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Preview Button - Show when uploaded */}
                      {isUploaded && isImageFile() && (
                        <button
                          onClick={handleTogglePreview}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAECF0] text-[#667085] hover:bg-gray-50"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={handleRemoveFile}
                        aria-label="Remove file"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAECF0] text-[#667085] hover:bg-gray-50"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
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

              {/* Preview Modal */}
              {showPreview && previewUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleTogglePreview}>
                  <div className="relative max-h-[90vh] max-w-[90vw] rounded-lg bg-white p-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={handleTogglePreview}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-[80vh] max-w-[80vw] object-contain"
                    />
                    <p className="mt-2 text-center text-sm text-gray-600">{uploadedFile?.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* License Number - Required + Remarks */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("license_number") || "License Number"}
                </FieldLabel>
                <input
                  name="licenseNumber"
                  placeholder={t("enter_license_number") || "Please Fill License Number"}
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <FieldLabel>
                  {t("remarks") || "Remarks"}
                </FieldLabel>
                <textarea
                  name="remarks"
                  placeholder={t("enter_remarks") || "Fill Remarks"}
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={7}
                  className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-5">
          <button
            onClick={onCancel}
            className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            onClick={onSave}
            className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
          >
            {t("save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}