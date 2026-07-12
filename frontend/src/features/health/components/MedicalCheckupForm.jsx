// src/features/health/components/MedicalCheckupForm.jsx
import React, { useState } from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const BLOOD_OPTIONS = ["A", "B", "AB", "O"];
const DECISION_OPTIONS = ["Normal", "Abnormal", "Fit", "Unfit"];

export default function MedicalCheckupForm({
  formData = {},
  onSave,
  onCancel,
  isLoading = false,
  isEdit = false,
}) {
  const { t } = useLanguage();
  const [data, setData] = useState({
    date: formData?.date || "",
    height: formData?.height || "",
    weight: formData?.weight || "",
    sightLeft: formData?.sightLeft || "",
    sightRight: formData?.sightRight || "",
    hearingLeft: formData?.hearingLeft || "",
    hearingRight: formData?.hearingRight || "",
    blood: formData?.blood || "",
    xray: formData?.xray || "",
    chest: formData?.chest || "",
    colorBlindness: formData?.colorBlindness || "",
    hospital: formData?.hospital || "",
    tooth: formData?.tooth || "",
    toothState: formData?.toothState || "",
    decision: formData?.decision || "",
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
        {isEdit ? "Edit Medical Checkup" : "Add Medical Checkup"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("date") || "Date"}
            </label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Height */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("height") || "Height (cm)"}
            </label>
            <input
              type="number"
              name="height"
              value={data.height}
              onChange={handleChange}
              placeholder="170"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("weight") || "Weight (kg)"}
            </label>
            <input
              type="number"
              name="weight"
              value={data.weight}
              onChange={handleChange}
              placeholder="65"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sight Left */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("sight_left") || "Sight (L)"}
            </label>
            <input
              type="text"
              name="sightLeft"
              value={data.sightLeft}
              onChange={handleChange}
              placeholder="1.0"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sight Right */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("sight_right") || "Sight (R)"}
            </label>
            <input
              type="text"
              name="sightRight"
              value={data.sightRight}
              onChange={handleChange}
              placeholder="1.0"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hearing Left */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("hearing_left") || "Hearing (L)"}
            </label>
            <input
              type="text"
              name="hearingLeft"
              value={data.hearingLeft}
              onChange={handleChange}
              placeholder="Normal"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hearing Right */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("hearing_right") || "Hearing (R)"}
            </label>
            <input
              type="text"
              name="hearingRight"
              value={data.hearingRight}
              onChange={handleChange}
              placeholder="Normal"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blood */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("blood") || "Blood"}
            </label>
            <select
              name="blood"
              value={data.blood}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Blood Type</option>
              {BLOOD_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* X-Ray */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("xray") || "X-Ray"}
            </label>
            <input
              type="text"
              name="xray"
              value={data.xray}
              onChange={handleChange}
              placeholder="Normal"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Chest */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("chest") || "Chest"}
            </label>
            <input
              type="text"
              name="chest"
              value={data.chest}
              onChange={handleChange}
              placeholder="Normal"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Color Blindness */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("color_blindness") || "Color Blindness"}
            </label>
            <input
              type="text"
              name="colorBlindness"
              value={data.colorBlindness}
              onChange={handleChange}
              placeholder="Normal"
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

          {/* Tooth */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("tooth") || "Tooth"}
            </label>
            <input
              type="text"
              name="tooth"
              value={data.tooth}
              onChange={handleChange}
              placeholder="Normal"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tooth State */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("tooth_state") || "Tooth State"}
            </label>
            <input
              type="text"
              name="toothState"
              value={data.toothState}
              onChange={handleChange}
              placeholder="Healthy"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Decision */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("decision") || "Decision"}
            </label>
            <select
              name="decision"
              value={data.decision}
              onChange={handleChange}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Decision</option>
              {DECISION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
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