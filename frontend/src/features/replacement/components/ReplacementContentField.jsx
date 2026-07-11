// src/features/replacement/components/ReplacementContentField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const SIGN_ON_CONTENT_OPTIONS = [
  { value: "probation", label: "Probation" },
  { value: "rejoining", label: "Re-Joining" },
  { value: "new_joining", label: "New Joining" },
  { value: "promotion", label: "Promotion" },
  { value: "paid_leave", label: "Paid Leave (Passenger Ship)" },
];

const SIGN_OFF_CONTENT_OPTIONS = [
  { value: "transfer", label: "Transfer" },
  { value: "etc", label: "ETC" },
  { value: "dismissal", label: "Dismissal" },
  { value: "vacation", label: "Vacation" },
  { value: "disciplinary", label: "Disciplinary" },
  { value: "promotion_off", label: "Promotion" },
  { value: "injury_illness", label: "Injure or Illness" },
  { value: "short_contract", label: "Short Contract" },
  { value: "self_will", label: "Self-Will" },
  { value: "without_notice", label: "Without Notice" },
  { value: "finished_contract", label: "Finished Contract" },
  { value: "end_paid_leave", label: "End of paid Leave(Passenger ships)" },
  { value: "sold", label: "SOLD" },
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function ReplacementContentField({ value, division, onChange, error }) {
  const { t } = useLanguage();

  const isSignOn = division === "sign_on";
  const isSignOff = division === "sign_off";

  const getContentOptions = () => {
    if (isSignOn) return SIGN_ON_CONTENT_OPTIONS;
    if (isSignOff) return SIGN_OFF_CONTENT_OPTIONS;
    return [];
  };

  const contentOptions = getContentOptions();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel required={true}>
        {t("deployment_content") || "Deployment Content"}
      </FieldLabel>
      <div className="relative">
        <select
          name="content"
          value={value}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
          required
          disabled={!division}
        >
          <option value="">
            {!division
              ? t("select_division_first") || "Please select Division first..."
              : t("select_deployment_content") || "Select Deployment Content..."}
          </option>
          {contentOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {!division && (
        <p className="text-xs text-amber-600">
          {t("select_division_first") || "Please select Division first"}
        </p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}