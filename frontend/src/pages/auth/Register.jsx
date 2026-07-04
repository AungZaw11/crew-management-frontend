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
          />{" "}
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
          Registration Forms
        </h1>
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-accent-green rounded-md border border-green-200 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={16} />
            <span className="text-sm font-medium">
              Record registered successfully.
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
                />{" "}
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-lg font-medium text-text-main">
              Register New {activeCategoryLabel}
            </h2>
            <p className="text-sm text-text-light mt-1">
              Enter the details below to add a new{" "}
              {activeCategoryLabel?.toLowerCase()} record.
            </p>
          </div>

          <form onSubmit={handleSave} className="flex-1 flex flex-col p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {activeCategory === "qualification" && (
                <>
                  <FormField label="License / Competency Name" />
                  <FormField label="Grade / Class" />
                  <FormField label="License Number" />
                  <FormField label="Issuing Authority" />
                  <FormField label="Issue Date" type="date" />
                  <FormField label="Expiry Date" type="date" />
                  <FormField
                    label="Status"
                    type="select"
                    options={["Valid", "Expired", "Processing"]}
                  />
                </>
              )}
              {/* Other categories - similar structure */}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                type="button"
                onClick={(e) => e.currentTarget.closest("form")?.reset()}
                className="px-6 py-2 rounded-md border border-gray-200 text-text-main hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
