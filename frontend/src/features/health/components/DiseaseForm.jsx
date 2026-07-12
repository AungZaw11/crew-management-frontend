// src/features/health/components/DiseaseForm.jsx
import React, { useState } from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function DiseaseForm({
  formData = {},
  onSave,
  onCancel,
  isLoading = false,
  isEdit = false,
}) {
  const { t } = useLanguage();
  const [data, setData] = useState({
    startDate: formData?.startDate || "",
    endDate: formData?.endDate || "",
    illness: formData?.illness || "",
    medicine: formData?.medicine || "",
    otherMedicine: formData?.otherMedicine || "",
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
        {isEdit ? "Edit Disease" : "Add Disease"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("start_date") || "Start Date"}
            </label>
            <input
              type="date"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("end_date") || "End Date"}
            </label>
            <input
              type="date"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          {/* Medicine */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("medicine") || "Medicine"}
            </label>
            <input
              type="text"
              name="medicine"
              value={data.medicine}
              onChange={handleChange}
              placeholder="Enter medicine"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Other Medicine */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("other_medicine") || "Other Medicine"}
            </label>
            <input
              type="text"
              name="otherMedicine"
              value={data.otherMedicine}
              onChange={handleChange}
              placeholder="Enter other medicine"
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