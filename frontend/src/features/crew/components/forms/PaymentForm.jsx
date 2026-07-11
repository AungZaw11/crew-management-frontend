// src/components/crew/forms/PaymentForm.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../"../../common/hooks/LanguageContext";

// ===== BANK OPTIONS =====
const BANK_OPTIONS = [
  "CB Bank",
  "KBZ Bank",
  "AYA Bank",
  "UAB Bank",
  "MAB Bank",
  "Yoma Bank",
  "AGD Bank",
  "Myanmar Citizens Bank",
  "Co-operative Bank",
  "Shinhan Bank",
  "Woori Bank",
  "Kookmin Bank",
  "Other",
];



// ===== RELATION OPTIONS =====
const RELATION_OPTIONS = [
  "Self",
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Cousin",
  "Nephew",
  "Niece",
  "Other",
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function PaymentForm({
  formData,
  onChange,
  onSave,
  onCancel,
  mode = "create",
  crewId,
}) {
  const { t } = useLanguage();
  const isEdit = mode === "edit";

  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            {isEdit
              ? t("edit_payment") || "Edit Payment"
              : t("new_payment") || "New Payment"}
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Bank Name */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("bank_name") || "Bank Name"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="bank"
                  value={formData?.bank || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_bank") || "Select Bank..."}
                  </option>
                  {BANK_OPTIONS.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>


             {/* Account Number */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("account_number") || "Account Number"}
              </FieldLabel>
              <input
                name="account"
                value={formData?.account || ""}
                onChange={onChange}
                placeholder={
                  t("enter_account_number") || "Enter account number"
                }
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>


            {/* Account Holder */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("account_holder") || "Account Holder"}
              </FieldLabel>
              <input
                name="holder"
                value={formData?.holder || ""}
                onChange={onChange}
                placeholder={
                  t("enter_account_holder") || "Enter account holder name"
                }
                className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                required
              />
            </div>

           
            {/* Relation */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel required={true}>
                {t("relation") || "Relation"}
              </FieldLabel>
              <div className="relative">
                <select
                  name="relation"
                  value={formData?.relation || ""}
                  onChange={onChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                >
                  <option value="">
                    {t("select_relation") || "Select Relation..."}
                  </option>
                  {RELATION_OPTIONS.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
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
            {isEdit ? t("update") || "Update" : t("save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
