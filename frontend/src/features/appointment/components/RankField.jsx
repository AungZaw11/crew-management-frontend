// src/features/appointment/components/RankField.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import FieldLabel from "./FieldLabel";

const RANK_OPTIONS = [
  { value: "20", label: "Master" },
  { value: "19", label: "Chief Officer" },
  { value: "6", label: "2nd Officer" },
  { value: "18", label: "3rd Officer" },
  { value: "15", label: "Chief Engineer" },
  { value: "3", label: "1st Engineer" },
  { value: "5", label: "2nd Engineer" },
  { value: "8", label: "3rd Engineer" },
  { value: "53", label: "Electrical Engineer" },
  { value: "17", label: "Boatswain" },
  { value: "12", label: "Able seaman" },
  { value: "40", label: "Ordinary Seaman" },
  { value: "4", label: "No.1 Oiler" },
  { value: "23", label: "Oiler" },
  { value: "45", label: "Fitter" },
  { value: "48", label: "Deck Cadet" },
  { value: "49", label: "Engine Cadet" },
  { value: "50", label: "Radio Officer" },
  { value: "41", label: "Wiper" },
  { value: "56", label: "Electrical rating" },
  { value: "54", label: "Motor man" },
  { value: "21", label: "Chief Cook" },
  { value: "38", label: "Cook" },
  { value: "2", label: "Mess Boy" },
  // ... ကျန်တဲ့ Options တွေ
];

export default function RankField({ value, onChange, error }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel required={true}>{t("rank") || "Rank"}</FieldLabel>
      <div className="relative">
        <select
          name="rank"
          value={value}
          onChange={onChange}
          className={`h-[41px] w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
          required
        >
          <option value="">
            {t("select_rank") || "Select Rank..."}
          </option>
          {RANK_OPTIONS.map((rank) => (
            <option key={rank.value} value={rank.value}>
              {rank.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}