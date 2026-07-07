// src/components/crew/PersonalInfoForm.jsx
import React from "react";
import { ChevronDown, CheckSquare, User } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function Field({
  label,
  value,
  placeholder,
  type = "text",
  suffix,
  className,
  isEditing = true,
  options = [],
  onChange,
  name,
}) {
  const { t } = useLanguage();

  const handleChange = (e) => {
    if (onChange) {
      onChange(name || label, e.target.value);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className || ""}`}>
      <label className="text-sm text-black">{label}</label>
      <div className="relative">
        {isEditing ? (
          type === "select" ? (
            <select
              value={value || ""}
              onChange={handleChange}
              className="h-10 w-full rounded border border-gray-200 bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67] appearance-none"
            >
              <option value="">{t("select_option") || "Select..."}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : type === "date" ? (
            <input
              type="date"
              value={value || ""}
              onChange={handleChange}
              className="h-10 w-full rounded border border-gray-200 bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
            />
          ) : type === "textarea" ? (
            <textarea
              value={value || ""}
              onChange={handleChange}
              rows={3}
              className="h-auto w-full rounded border border-gray-200 bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
            />
          ) : (
            <input
              type="text"
              value={value || ""}
              onChange={handleChange}
              placeholder={placeholder}
              className="h-10 w-full rounded border border-gray-200 bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
            />
          )
        ) : (
          <div className="h-10 w-full rounded border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-[#3C5065] flex items-center">
            {value || <span className="text-gray-400">—</span>}
          </div>
        )}

        {type === "select" && isEditing && (
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
        )}
        {suffix && (
          <span className="absolute right-0 top-1/2 flex h-full -translate-y-1/2 items-center border-l border-[#E3E8ED] px-4 text-sm text-black">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center bg-[#EFF6FF] px-6 py-2.5">
      <h2 className="text-[17px] font-medium text-[#3C5065]">{title}</h2>
    </div>
  );
}

export default function PersonalInfoForm({
  crewMember = {},
  isEditing = true,
  onChange,
  onSave,
  onCancel,
}) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0px_4px_4px_rgba(79,129,189,0.25)]">
        {/* ===== Personal Information ===== */}
        <SectionHeader title={t("personal_info") || "Personal Information"} />
        <div className="flex flex-col gap-8 border-b border-gray-200 p-6 lg:flex-row">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-[162px] w-[140px] items-center justify-center rounded bg-gray-200">
              <User className="h-16 w-16 text-gray-400" />
            </div>
            {isEditing && (
              <button className="rounded-md border border-[#3C5065] px-6 py-1.5 text-xs font-semibold text-[#3C5065] hover:bg-slate-50">
                {t("choose_file") || "Choose File"}
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Field
              label={t("crew_code") || "Crew Code"}
              value={crewMember.crew_code}
              onChange={onChange}
              name="crew_code"
              isEditing={isEditing}
            />
            <Field
              label={t("name_korean") || "Name (Korean)"}
              value={crewMember.name_kor || "캬우 소 아웅"}
              onChange={onChange}
              name="name_kor"
              isEditing={isEditing}
            />
            <Field
              label={t("name_english") || "Name (English)"}
              value={crewMember.name_eng || "Mg Mg"}
              onChange={onChange}
              name="name_eng"
              isEditing={isEditing}
            />
            <Field
              label={t("position") || "Position"}
              value={crewMember.rank || "Pilot"}
              onChange={onChange}
              name="rank"
              type="select"
              options={["Pilot", "Chief Officer", "Able Seaman", "Engineer"]}
              isEditing={isEditing}
            />
            <Field
              label={t("hire_date") || "Hire Date"}
              value={crewMember.hire_date || "2025-05-11"}
              onChange={onChange}
              name="hire_date"
              type="date"
              isEditing={isEditing}
            />
            <Field
              label={t("name_chinese") || "Name (Chinese)"}
              value="觉梭昂"
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
            <Field
              label={t("address_1") || "Address 1"}
              value={crewMember.address}
              onChange={onChange}
              name="address"
              isEditing={isEditing}
            />
            <Field
              label={t("address_2") || "Address 2"}
              value=""
              onChange={onChange}
              name="address_2"
              isEditing={isEditing}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Field
              label={t("phone") || "Phone Number"}
              value={crewMember.phone || "+95 987 654 321"}
              onChange={onChange}
              name="phone"
              isEditing={isEditing}
            />
            <Field
              label={t("mobile") || "Mobile Number"}
              value="+95 987 654 321"
              onChange={onChange}
              name="mobile"
              isEditing={isEditing}
            />
            <Field
              label={t("email") || "Email Address"}
              value={crewMember.email || "kyawsoe1@gmail.com"}
              onChange={onChange}
              name="email"
              isEditing={isEditing}
            />
            <Field
              label={t("emergency_1") || "Emergency Contact 1"}
              value="+95 999 888 777"
              onChange={onChange}
              name="emergency_1"
              isEditing={isEditing}
            />
            <Field
              label={t("emergency_2") || "Emergency Contact 2"}
              value="+95 999 888 777"
              onChange={onChange}
              name="emergency_2"
              isEditing={isEditing}
            />
            <Field
              label={t("resident_id") || "Resident Registration Number"}
              value="011 4412"
              onChange={onChange}
              name="resident_id"
              isEditing={isEditing}
            />
          </div>
        </div>

        {/* ===== Details Information ===== */}
        <SectionHeader title={t("details_info") || "Details Information"} />
        <div className="p-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            <Field
              label={t("birth_date") || "Birth Date"}
              value={crewMember.birth_date}
              onChange={onChange}
              name="birth_date"
              type="date"
              isEditing={isEditing}
            />
            <Field
              label={t("nationality") || "Nationality"}
              value={crewMember.nationality || "Myanmar"}
              onChange={onChange}
              name="nationality"
              type="select"
              options={["Myanmar", "Korean", "Other"]}
              isEditing={isEditing}
            />
            <Field
              label={t("religion") || "Religion"}
              value=""
              onChange={onChange}
              name="religion"
              isEditing={isEditing}
            />
            <Field
              label={t("education_university") || "Education(University)"}
              value="011 4412"
              onChange={onChange}
              name="education_university"
              isEditing={isEditing}
            />
            <Field
              label={t("education_school") || "Education(School)"}
              value=""
              onChange={onChange}
              name="education_school"
              isEditing={isEditing}
            />
            <Field
              label={t("boarding_vessel") || "Boarding Vessel"}
              value={crewMember.vessel || "Sun Rio"}
              onChange={onChange}
              name="vessel"
              isEditing={isEditing}
            />
            <Field
              label={t("waist") || "Waist"}
              suffix="inch"
              value=""
              onChange={onChange}
              name="waist"
              isEditing={isEditing}
            />
            <Field
              label={t("safety_shoes") || "Safety Shoes"}
              suffix="mm"
              value=""
              onChange={onChange}
              name="safety_shoes"
              isEditing={isEditing}
            />
            <Field
              label={t("garments") || "Garments"}
              value=""
              onChange={onChange}
              name="garments"
              isEditing={isEditing}
            />
            <Field
              label={t("drinking") || "Drinking (Capacity)"}
              value=""
              onChange={onChange}
              name="drinking"
              isEditing={isEditing}
            />
            <Field
              label={t("smoking") || "Smoking"}
              value=""
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
            <Field
              label={t("monthly_position") || "Monthly Position"}
              value=""
              onChange={onChange}
              name="monthly_position"
              isEditing={isEditing}
            />
            <Field
              label={t("chemical") || "Chemical"}
              value=""
              onChange={onChange}
              name="chemical"
              isEditing={isEditing}
            />
            <Field
              label={t("tanker") || "Tanker"}
              value=""
              onChange={onChange}
              name="tanker"
              isEditing={isEditing}
            />
            <Field
              label={t("watch_office") || "Watch Office"}
              value=""
              onChange={onChange}
              name="watch_office"
              isEditing={isEditing}
            />
            <Field
              label={t("note") || "Note"}
              value={crewMember.note}
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
            <Field
              label={t("mariners_license") || "Mariner's license"}
              value=""
              onChange={onChange}
              name="mariners_license"
              isEditing={isEditing}
            />
            <Field
              label={t("passport") || "Passport"}
              value={crewMember.passport || "MJ 652214"}
              onChange={onChange}
              name="passport"
              isEditing={isEditing}
            />
            <Field
              label={t("telecom_license") || "Telecommunications License"}
              value=""
              onChange={onChange}
              name="telecom_license"
              isEditing={isEditing}
            />
            <Field
              label={t("physical_exam") || "Physical Examination"}
              value="[Medical] (2026-07-14) [DAA] (2025-02-22)"
              onChange={onChange}
              name="physical_exam"
              isEditing={isEditing}
            />
            <Field
              label={t("seaman_handbook") || "Seaman's Handbook"}
              value="[SB(PN)] PA0245257 (2028-02-24)[SB(MM)] 61149 (2028-05-09)"
              onChange={onChange}
              name="seaman_handbook"
              isEditing={isEditing}
            />
            <Field
              label={t("contract_period") || "Employment Contract Period"}
              value="2026-03-07 - 2026-07-31"
              onChange={onChange}
              name="contract_period"
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>

      {/* ===== Action Bar ===== */}
      {isEditing && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <button className="rounded-md border border-[#3C5065] bg-[#E5E7EB] px-8 py-2.5 text-xs font-semibold text-[#3C5065] hover:bg-gray-300">
            {t("preview") || "Preview"}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="rounded-md border border-gray-200 bg-white px-8 py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={onSave}
              className="rounded-md bg-[#002F67] px-10 py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
            >
              {t("save") || "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
