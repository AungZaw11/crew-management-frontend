// src/features/crew/components/PersonalInfoForm/index.jsx
import React from "react";
import { User, CheckSquare, Upload, X } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FormField from "../../../common/components/FormField";

// ==================== SECTION HEADER ====================
function SectionHeader({ title }) {
  return (
    <div className="flex items-center bg-[#EFF6FF] px-6 py-2.5">
      <h2 className="text-[17px] font-medium text-[#3C5065]">{title}</h2>
    </div>
  );
}

// ==================== AVATAR UPLOAD ====================
function AvatarUpload({ 
  avatarPreview, 
  isEditing, 
  onFileUpload, 
  onRemoveAvatar 
}) {
  const { t } = useLanguage();
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    onFileUpload(file);
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
            onClick={onRemoveAvatar}
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

// ==================== MAIN COMPONENT ====================
export default function PersonalInfoForm({
  crewMember = {},
  isEditing = true,
  onChange,
  onSave,
  onCancel,
  errors = {},
  isLoading = false,
  avatarPreview = null,
  onFileUpload,
  onRemoveAvatar,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0px_4px_4px_rgba(79,129,189,0.25)]">
        
        {/* ===== Personal Information ===== */}
        <SectionHeader title={t("personal_info") || "Personal Information"} />
        <div className="flex flex-col gap-8 border-b border-gray-200 p-6 lg:flex-row">
          {/* Avatar */}
          <AvatarUpload
            avatarPreview={avatarPreview}
            isEditing={isEditing}
            onFileUpload={onFileUpload}
            onRemoveAvatar={onRemoveAvatar}
          />

          {/* Fields */}
          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <FormField
              label={t("crew_code") || "Crew Code"}
              value={crewMember.crew_code}
              onChange={onChange}
              name="crew_code"
              isEditing={isEditing}
              required={true}
              error={errors.crew_code}
            />
            <FormField
              label={t("position") || "Position"}
              value={crewMember.rank || ""}
              onChange={onChange}
              name="rank"
              type="select"
              options={["Pilot", "Chief Officer", "Able Seaman", "Engineer"]}
              placeholder={t("select_position") || "Please select position"}
              isEditing={isEditing}
              required={true}
              error={errors.rank}
            />
            <FormField
              label={t("hire_date") || "Hire Date"}
              value={crewMember.hire_date || ""}
              onChange={onChange}
              name="hire_date"
              type="date"
              isEditing={isEditing}
              required={true}
              error={errors.hire_date}
            />
            <FormField
              label={t("name_english") || "Name (English)"}
              value={crewMember.name_eng || ""}
              onChange={onChange}
              name="name_eng"
              isEditing={isEditing}
            />
            <FormField
              label={t("name_korean") || "Name (Korean)"}
              value={crewMember.name_kor || ""}
              onChange={onChange}
              name="name_kor"
              isEditing={isEditing}
            />
            <FormField
              label={t("name_chinese") || "Name (Chinese)"}
              value={crewMember.name_chinese || ""}
              onChange={onChange}
              name="name_chinese"
              isEditing={isEditing}
            />
          </div>
        </div>

        {/* ===== Contact Information ===== */}
        <SectionHeader title={t("contact_info") || "Contact Information"} />
        <div className="border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormField
              label={t("address_eng") || "Address (English)"}
              value={crewMember.address || ""}
              onChange={onChange}
              name="address"
              isEditing={isEditing}
              required={true}
              error={errors.address}
            />
            <FormField
              label={t("address_korean") || "Address (Korean)"}
              value={crewMember.address_kor || ""}
              onChange={onChange}
              name="address_kor"  
              isEditing={isEditing}
              required={false}
              error={errors.address_kor}
            /> 
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <FormField
              label={t("phone") || "Phone Number"}
              value={crewMember.phone || ""}
              onChange={onChange}
              name="phone"
              isEditing={isEditing}
              required={true}
              error={errors.phone}
            />
            <FormField
              label={t("mobile") || "Mobile Number"}
              value={crewMember.mobile || ""}
              onChange={onChange}
              name="mobile"
              isEditing={isEditing}
              required={true}
              error={errors.mobile}
            />
            <FormField
              label={t("email") || "Email Address"}
              value={crewMember.email || ""}
              onChange={onChange}
              name="email"
              isEditing={isEditing}
              required={true}
              error={errors.email}
            />
            <FormField
              label={t("emergency_1") || "Emergency Contact 1"}
              value={crewMember.emergency_1 || ""}
              onChange={onChange}
              name="emergency_1"
              isEditing={isEditing}
            />
            <FormField
              label={t("emergency_2") || "Emergency Contact 2"}
              value={crewMember.emergency_2 || ""}
              onChange={onChange}
              name="emergency_2"
              isEditing={isEditing}
            />
            <FormField
              label={t("resident_id") || "Resident Registration Number"}
              value={crewMember.resident_id || ""}
              onChange={onChange}
              name="resident_id"
              required={true}
              isEditing={isEditing}
              error={errors.resident_id}
            />
          </div>
        </div>

        {/* ===== Details Information ===== */}
        <SectionHeader title={t("details_info") || "Details Information"} />
        <div className="p-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            <FormField
              label={t("birth_date") || "Birth Date"}
              value={crewMember.birth_date || ""}
              onChange={onChange}
              name="birth_date"
              type="date"
              isEditing={isEditing}
              required={true}
              error={errors.birth_date}
            />
            <FormField
              label={t("nationality") || "Nationality"}
              value={crewMember.nationality || ""}
              onChange={onChange}
              name="nationality"
              type="select"
              options={["Myanmar", "Korean", "Other"]}
              placeholder={t("select_nationality") || "Please select nationality"}
              isEditing={isEditing}
              required={true}
              error={errors.nationality}
            />
            <FormField
              label={t("religion") || "Religion"}
              value={crewMember.religion || ""}
              onChange={onChange}
              name="religion"
              isEditing={isEditing}
            />
            <FormField
              label={t("education_university") || "Education(University)"}
              value={crewMember.education_university || ""}
              onChange={onChange}
              name="education_university"
              isEditing={isEditing}
            />
            <FormField
              label={t("education_school") || "Education(School)"}
              value={crewMember.education_school || ""}
              onChange={onChange}
              name="education_school"
              isEditing={isEditing}
            />
            <FormField
              label={t("boarding_vessel") || "Boarding Vessel"}
              value={crewMember.vessel || ""}
              onChange={onChange}
              name="vessel"
              required={true}
              isEditing={isEditing}
              error={errors.vessel}
            />
            <FormField
              label={t("waist") || "Waist"}
              suffix="inch"
              value={crewMember.waist || ""}
              onChange={onChange}
              name="waist"
              isEditing={isEditing}
            />
            <FormField
              label={t("safety_shoes") || "Safety Shoes"}
              suffix="mm"
              value={crewMember.safety_shoes || ""}
              onChange={onChange}
              name="safety_shoes"
              isEditing={isEditing}
            />
            <FormField
              label={t("garments") || "Garments"}
              value={crewMember.garments || ""}
              onChange={onChange}
              name="garments"
              isEditing={isEditing}
            />
            <FormField
              label={t("drinking") || "Drinking (Capacity)"}
              value={crewMember.drinking || ""}
              onChange={onChange}
              name="drinking"
              isEditing={isEditing}
            />
            <FormField
              label={t("smoking") || "Smoking"}
              value={crewMember.smoking || ""}
              onChange={onChange}
              name="smoking"
              isEditing={isEditing}
            />
            <div className="flex items-end pb-2.5">
              <label className="flex cursor-pointer items-center gap-4 text-sm text-[#3C5065]">
                <CheckSquare className="h-6 w-6 text-[#002F67]" />
                {t("long_service") || "long service"}
              </label>
            </div>
            <FormField
              label={t("monthly_position") || "Monthly Position"}
              value={crewMember.monthly_position || ""}
              onChange={onChange}
              name="monthly_position"
              isEditing={isEditing}
            />
            <FormField
              label={t("chemical") || "Chemical"}
              value={crewMember.chemical || ""}
              onChange={onChange}
              name="chemical"
              isEditing={isEditing}
            />
            <FormField
              label={t("tanker") || "Tanker"}
              value={crewMember.tanker || ""}
              onChange={onChange}
              name="tanker"
              isEditing={isEditing}
            />
            <FormField
              label={t("watch_office") || "Watch Office"}
              value={crewMember.watch_office || ""}
              onChange={onChange}
              name="watch_office"
              isEditing={isEditing}
            />
            <FormField
              label={t("note") || "Note"}
              value={crewMember.note || ""}
              onChange={onChange}
              name="note"
              type="textarea"
              className="md:col-span-2"
              isEditing={isEditing}
            />
          </div>
        </div>

        {/* ===== Documents ===== */}
        <div className="border-t border-gray-200 bg-[#FBFDFF] p-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            <FormField
              label={t("mariners_license") || "Mariner's License"}
              value={crewMember.mariners_license || ""}
              onChange={onChange}
              name="mariners_license"
              isEditing={isEditing}
              required={false}
              error={errors.mariners_license}
              placeholder={t("enter_license") || "Enter license number"}
            />
            <FormField
              label={t("passport") || "Passport"}
              value={crewMember.passport || ""}
              onChange={onChange}
              name="passport"
              isEditing={isEditing}
              required={false}
              error={errors.passport}
              placeholder={t("enter_passport") || "Enter passport number"}
            />
            <FormField
              label={t("telecom_license") || "Telecommunications License"}
              value={crewMember.telecom_license || ""}
              onChange={onChange}
              name="telecom_license"
              isEditing={isEditing}
              placeholder={t("enter_telecom") || "Enter telecom license"}
            />
            <FormField
              label={t("physical_exam") || "Physical Examination"}
              value={crewMember.physical_exam || ""}
              onChange={onChange}
              name="physical_exam"
              isEditing={isEditing}
              placeholder={t("enter_physical") || "Enter physical exam date"}
            />
            <FormField
              label={t("seaman_handbook") || "Seaman's Handbook"}
              value={crewMember.seaman_handbook || ""}
              onChange={onChange}
              name="seaman_handbook"
              isEditing={isEditing}
              placeholder={t("enter_handbook") || "Enter handbook number"}
            />
            <FormField
              label={t("contract_period") || "Employment Contract Period"}
              value={crewMember.contract_period || ""}
              onChange={onChange}
              name="contract_period"
              isEditing={isEditing}
              placeholder={t("enter_contract") || "Enter contract period"}
            />
          </div>
        </div>
      </div>

      {/* ===== Action Bar ===== */}
      {isEditing && (
        <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="rounded-md border border-gray-200 bg-white px-8 py-2.5 text-sm text-[#3C5065] hover:bg-slate-50 disabled:opacity-50"
              disabled={isLoading}
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={onSave}
              className="rounded-md bg-[#002F67] px-10 py-2.5 text-sm font-medium text-white hover:bg-[#00397e] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : t("save") || "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}