// src/pages/crew/forms/PaymentForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";

// ===== BANK NAME OPTIONS =====
const BANK_OPTIONS = [
  "KB Kookmin Bank",
  "Shinhan Bank",
  "Hana Bank",
  "Woori Bank",
  "NH NongHyup Bank",
  "IBK Industrial Bank",
  "Korea Development Bank",
  "Citibank Korea",
  "Standard Chartered Korea",
  "DGB Daegu Bank",
  "BNK Busan Bank",
  "Kyongnam Bank",
  "Jeonbuk Bank",
  "Jeju Bank",
  "Korea Post",
  "Other",
];

// ===== RELATION OPTIONS =====
const RELATION_OPTIONS = [
  "Self",
  "Spouse",
  "Child",
  "Parent",
  "Sibling",
  "Relative",
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

export default function PaymentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    relation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving payment:", formData);
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

  const crewLabel = t("new_payment") || "New Payment";

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
              {t("new_payment") || "New Payment"}
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              {/* Bank Name - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("bank_name") || "Bank Name"}
                </FieldLabel>
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
              </div>

              {/* Account Holder - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("account_holder") || "Account Holder"}
                </FieldLabel>
                <input
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  placeholder={t("enter_account_holder") || "Enter account holder name"}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
              </div>

              {/* Account Number - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("account_number") || "Account Number"}
                </FieldLabel>
                <input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder={t("enter_account_number") || "Enter account number"}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                  required
                />
              </div>

              {/* Relation - Required */}
              <div className="flex flex-col gap-2.5">
                <FieldLabel required={true}>
                  {t("relation") || "Relation"}
                </FieldLabel>
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
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
              </div>
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