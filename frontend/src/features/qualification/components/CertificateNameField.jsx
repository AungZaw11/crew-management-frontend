// src/features/qualification/components/CertificateNameField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ✅ CERTIFICATE_OPTIONS ကို ဒီမှာထားပါ
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

export default function CertificateNameField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-base font-medium text-[#315888]">
        {t("certificate_name") || "Certificate Name"}
      </label>
      <div className="relative">
        <select
          name="certificateName"
          value={value || ""}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
        >
          <option value="">
            {t("select_certificate") || "Select Certificate..."}
          </option>
          {CERTIFICATE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}