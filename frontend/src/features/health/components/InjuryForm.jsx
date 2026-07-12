// src/features/health/components/InjuryForm.jsx
import React, { useState } from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function InjuryForm({
  formData = {},
  onSave,
  onCancel,
  isLoading = false,
  isEdit = false,
}) {
  const { t } = useLanguage();
  const [data, setData] = useState({
    illness: formData?.illness || "",
    medicalName: formData?.medicalName || "",
    hospital: formData?.hospital || "",
    treatmentStart: formData?.treatmentStart || "",
    recoveryDate: formData?.recoveryDate || "",
    type: formData?.type || "Private",
    expenseWon: formData?.expenseWon || "",
    expenseEx: formData?.expenseEx || "",
    remarks: formData?.remarks || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        {isEdit ? "Edit Injury" : "Add Injury"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Illness */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("illness") || "Illness"}
            </label>
            <input
              type="text"
              name="illness"
              value={data.illness}
              onChange={handleChange}
              placeholder="Enter illness"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Medical Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("medical_name") || "Medical Name"}
            </label>
            <input
              type="text"
              name="medicalName"
              value={data.medicalName}
              onChange={handleChange}
              placeholder="Enter medical name"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hospital */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("hospital") || "Hospital"}
            </label>
            <input
              type="text"
              name="hospital"
              value={data.hospital}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Treatment Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("treatment_start_date") || "Treatment Start Date"}
            </label>
            <input
              type="date"
              name="treatmentStart"
              value={data.treatmentStart}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Recovery Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("recovery_date") || "Recovery Date"}
            </label>
            <input
              type="date"
              name="recoveryDate"
              value={data.recoveryDate}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Public/Private */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("public_private") || "Public/Private"}
            </label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          {/* Expense Won */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("expense_won") || "Expense_won"}
            </label>
            <input
              type="number"
              name="expenseWon"
              value={data.expenseWon}
              onChange={handleChange}
              placeholder="0"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Expense Ex */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("expense_ex") || "Expense_ex"}
            </label>
            <input
              type="number"
              name="expenseEx"
              value={data.expenseEx}
              onChange={handleChange}
              placeholder="0"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remarks - Full Width */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              {t("remarks") || "Remarks"}
            </label>
            <textarea
              name="remarks"
              value={data.remarks}
              onChange={handleChange}
              placeholder="Enter remarks"
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEdit ? t("update") || "Update" : t("save") || "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}