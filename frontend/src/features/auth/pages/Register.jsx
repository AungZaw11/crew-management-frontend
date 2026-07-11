// src/pages/auth/Register.jsx
import React, { useState } from "react";
import {
  Award,
  Briefcase,
  RefreshCw,
  DollarSign,
  AlertTriangle,
  HeartPulse,
  Users,
  Activity,
  Anchor,
  Star,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../common/hooks/LanguageContext";

function FormField({
  label,
  type = "text",
  options,
  fullWidth = false,
  isCheckbox = false,
}) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? "md:col-span-2" : ""}`}>
      {isCheckbox ? (
        <label className="flex items-center gap-3 text-sm font-medium text-black mt-6 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
          />
          {label}
        </label>
      ) : (
        <>
          <label className="text-sm font-medium text-black">{label}</label>
          {type === "select" ? (
            <select
              className="border border-gray-200 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none bg-white"
              required
            >
              <option value="">Select {label}...</option>
              {options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              className="border border-gray-200 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none min-h-[100px]"
              placeholder={`Enter ${label.toLowerCase()}...`}
            />
          ) : (
            <input
              type={type}
              className="border border-gray-200 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none"
              placeholder={`Enter ${label.toLowerCase()}...`}
              required={type !== "textarea"}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function Register() {
  const { t } = useLanguage();

  const categories = [
    { id: "qualification", label: "Qualification", icon: Award },
    { id: "appointment", label: "Appointment", icon: Briefcase },
    { id: "replacement", label: "Replacement", icon: RefreshCw },
    { id: "payment", label: "Payment", icon: DollarSign },
    { id: "accident", label: "Accident", icon: AlertTriangle },
    { id: "injury", label: "Injury", icon: HeartPulse },
    { id: "family", label: "Family", icon: Users },
    { id: "health", label: "Health", icon: Activity },
    { id: "experiences", label: "Experiences", icon: Anchor },
    { id: "evaluation", label: "Evaluation", icon: Star },
    { id: "certificates", label: "Certificates", icon: FileCheck },
  ];

  const [activeCategory, setActiveCategory] = useState("qualification");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    e.target.reset();
  };

  const activeCategoryLabel = categories.find(
    (c) => c.id === activeCategory,
  )?.label;

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto pb-12 px-2 sm:px-4">
      <div className="flex justify-between items-center h-10">
        <h1 className="text-xl font-medium text-text-main">
          {t("register") || "Registration Forms"}
        </h1>
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-accent-green rounded-md border border-green-200 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={16} />
            <span className="text-sm font-medium">
              {t("record_registered") || "Record registered successfully."}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-md border border-gray-200 shadow-card flex flex-col md:flex-row min-h-[600px]">
        <div className="w-full md:w-64 border-r border-gray-200 p-4 flex flex-col gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowSuccess(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors text-left ${
                  isActive
                    ? "bg-brand-lighter text-brand font-medium"
                    : "hover:bg-gray-50 text-text-main"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-brand" : "text-text-light"}
                />
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-lg font-medium text-text-main">
              {t("register_new") || "Register New"} {activeCategoryLabel}
            </h2>
            <p className="text-sm text-text-light mt-1">
              {t("enter_details") || "Enter the details below to add a new"}{" "}
              {activeCategoryLabel?.toLowerCase()} {t("record") || "record"}.
            </p>
          </div>

          <form onSubmit={handleSave} className="flex-1 flex flex-col p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {activeCategory === "qualification" && (
                <>
                  <FormField
                    label={t("license_name") || "License / Competency Name"}
                  />
                  <FormField label={t("grade_class") || "Grade / Class"} />
                  <FormField label={t("license_number") || "License Number"} />
                  <FormField
                    label={t("issuing_authority") || "Issuing Authority"}
                  />
                  <FormField
                    label={t("issue_date") || "Issue Date"}
                    type="date"
                  />
                  <FormField
                    label={t("expiry_date") || "Expiry Date"}
                    type="date"
                  />
                  <FormField
                    label={t("status") || "Status"}
                    type="select"
                    options={["Valid", "Expired", "Processing"]}
                  />
                </>
              )}
              {activeCategory === "appointment" && (
                <>
                  <FormField label={t("crew_member") || "Crew Member"} />
                  <FormField
                    label={t("vessel") || "Vessel"}
                    type="select"
                    options={["HS Glory", "CS Crystal", "Ocean Star"]}
                  />
                  <FormField
                    label={t("rank") || "Rank"}
                    type="select"
                    options={[
                      "Master",
                      "Chief Officer",
                      "Second Officer",
                      "Deck Cadet",
                      "Chief Engineer",
                    ]}
                  />
                  <FormField
                    label={t("department") || "Department"}
                    type="select"
                    options={["Deck", "Engine", "Galley"]}
                  />
                  <FormField
                    label={t("sign_on_date") || "Sign-on Date"}
                    type="date"
                  />
                  <FormField
                    label={t("expected_sign_off") || "Expected Sign-off"}
                    type="date"
                  />
                  <FormField
                    label={t("port_of_engagement") || "Port of Engagement"}
                  />
                  <FormField
                    label={t("contract_type") || "Contract Type"}
                    type="select"
                    options={["Permanent", "Temporary", "Probation"]}
                  />
                </>
              )}
              {activeCategory === "replacement" && (
                <>
                  <FormField
                    label={t("outgoing_crew") || "Outgoing Crew Member"}
                  />
                  <FormField label={t("reliever_name") || "Reliever Name"} />
                  <FormField label={t("reliever_rank") || "Reliever Rank"} />
                  <FormField label={t("relief_port") || "Relief Port"} />
                  <FormField
                    label={t("planned_date") || "Planned Date"}
                    type="date"
                  />
                  <FormField
                    label={t("status") || "Status"}
                    type="select"
                    options={["Planned", "Confirmed", "Completed"]}
                  />
                </>
              )}
              {activeCategory === "payment" && (
                <>
                  <FormField label={t("crew_member") || "Crew Member"} />
                  <FormField
                    label={t("pay_period") || "Pay Period"}
                    type="month"
                  />
                  <FormField
                    label={t("basic_wage") || "Basic Wage"}
                    type="number"
                  />
                  <FormField
                    label={t("overtime") || "Overtime"}
                    type="number"
                  />
                  <FormField
                    label={t("allowances") || "Allowances"}
                    type="number"
                  />
                  <FormField
                    label={t("deductions") || "Deductions"}
                    type="number"
                  />
                  <FormField
                    label={t("currency") || "Currency"}
                    type="select"
                    options={["USD", "EUR", "SGD"]}
                  />
                  <FormField label={t("bank_name") || "Bank Name"} />
                  <FormField label={t("account_number") || "Account Number"} />
                  <FormField
                    label={t("payment_date") || "Payment Date"}
                    type="date"
                  />
                </>
              )}
              {activeCategory === "accident" && (
                <>
                  <FormField
                    label={t("incident_date") || "Date of Incident"}
                    type="date"
                  />
                  <FormField label={t("vessel") || "Vessel"} />
                  <FormField label={t("location") || "Location on Vessel"} />
                  <FormField
                    label={t("accident_type") || "Type of Accident"}
                    type="select"
                    options={[
                      "Collision",
                      "Fire",
                      "Equipment Failure",
                      "Other",
                    ]}
                  />
                  <FormField
                    label={t("severity") || "Severity"}
                    type="select"
                    options={["Minor", "Moderate", "Severe", "Critical"]}
                  />
                  <FormField label={t("reported_by") || "Reported By"} />
                  <FormField
                    label={t("description") || "Description"}
                    type="textarea"
                    fullWidth
                  />
                  <FormField
                    label={t("action_taken") || "Action Taken"}
                    type="textarea"
                    fullWidth
                  />
                </>
              )}
              {activeCategory === "injury" && (
                <>
                  <FormField
                    label={t("injury_date") || "Date of Injury"}
                    type="date"
                  />
                  <FormField label={t("body_part") || "Body Part Affected"} />
                  <FormField
                    label={t("injury_type") || "Injury Type"}
                    type="select"
                    options={[
                      "Burn",
                      "Fracture",
                      "Laceration",
                      "Sprain",
                      "Other",
                    ]}
                  />
                  <FormField label={t("treatment") || "Treatment Provided"} />
                  <FormField
                    label={t("days_off") || "Days Off Work"}
                    type="number"
                  />
                  <FormField
                    label={t("fit_date") || "Fit-to-work Date"}
                    type="date"
                  />
                  <FormField
                    label={t("notes") || "Notes"}
                    type="textarea"
                    fullWidth
                  />
                </>
              )}
              {activeCategory === "family" && (
                <>
                  <FormField label={t("next_of_kin") || "Next of Kin Name"} />
                  <FormField
                    label={t("relationship") || "Relationship"}
                    type="select"
                    options={["Spouse", "Parent", "Child", "Sibling", "Other"]}
                  />
                  <FormField
                    label={t("contact_number") || "Contact Number"}
                    type="tel"
                  />
                  <FormField
                    label={t("email") || "Email Address"}
                    type="email"
                  />
                  <FormField
                    label={t("address") || "Address"}
                    type="textarea"
                    fullWidth
                  />
                  <FormField
                    label={t("emergency_contact") || "Set as Emergency Contact"}
                    isCheckbox
                  />
                </>
              )}
              {activeCategory === "health" && (
                <>
                  <FormField
                    label={t("blood_type") || "Blood Type"}
                    type="select"
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                  />
                  <FormField
                    label={t("last_exam") || "Last Medical Exam"}
                    type="date"
                  />
                  <FormField
                    label={t("fit_expiry") || "Fit-to-work Expiry"}
                    type="date"
                  />
                  <FormField
                    label={t("vaccinations") || "Vaccinations"}
                    type="textarea"
                    fullWidth
                  />
                  <FormField
                    label={t("allergies") || "Allergies"}
                    type="textarea"
                    fullWidth
                  />
                  <FormField
                    label={t("medical_notes") || "Medical Notes"}
                    type="textarea"
                    fullWidth
                  />
                </>
              )}
              {activeCategory === "experiences" && (
                <>
                  <FormField label={t("vessel_name") || "Vessel Name"} />
                  <FormField
                    label={t("vessel_type") || "Vessel Type"}
                    type="select"
                    options={[
                      "Bulk Carrier",
                      "Container Ship",
                      "Oil Tanker",
                      "Gas Carrier",
                      "Ro-Ro",
                    ]}
                  />
                  <FormField label={t("rank") || "Rank"} />
                  <FormField
                    label={t("grt") || "GRT (Gross Tonnage)"}
                    type="number"
                  />
                  <FormField label={t("company") || "Company"} />
                  <FormField
                    label={t("from_date") || "From Date"}
                    type="date"
                  />
                  <FormField label={t("to_date") || "To Date"} type="date" />
                </>
              )}
              {activeCategory === "evaluation" && (
                <>
                  <FormField
                    label={t("evaluation_period") || "Evaluation Period"}
                    type="month"
                  />
                  <FormField label={t("evaluator") || "Evaluator Name"} />
                  <FormField
                    label={t("overall_rating") || "Overall Rating (1-5)"}
                    type="number"
                  />
                  <FormField
                    label={
                      t("technical_rating") || "Technical Skills Rating (1-5)"
                    }
                    type="number"
                  />
                  <FormField
                    label={t("teamwork_rating") || "Teamwork Rating (1-5)"}
                    type="number"
                  />
                  <FormField
                    label={t("recommendation") || "Recommendation"}
                    type="select"
                    options={["Promote", "Retain", "Warning", "Dismiss"]}
                  />
                  <FormField
                    label={t("comments") || "Comments"}
                    type="textarea"
                    fullWidth
                  />
                </>
              )}
              {activeCategory === "certificates" && (
                <>
                  <FormField
                    label={t("certificate_name") || "Certificate Name"}
                  />
                  <FormField
                    label={t("certificate_number") || "Certificate Number"}
                  />
                  <FormField
                    label={t("issuing_authority") || "Issuing Authority"}
                  />
                  <FormField
                    label={t("issue_date") || "Issue Date"}
                    type="date"
                  />
                  <FormField
                    label={t("expiry_date") || "Expiry Date"}
                    type="date"
                  />
                  <FormField
                    label={t("status") || "Status"}
                    type="select"
                    options={["Valid", "Expiring Soon", "Expired"]}
                  />
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                type="button"
                onClick={(e) => e.currentTarget.closest("form")?.reset()}
                className="px-6 py-2 rounded-md border border-gray-200 text-text-main hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                {t("reset") || "Reset"}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
              >
                {t("save_record") || "Save Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
