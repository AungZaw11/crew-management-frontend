// src/features/qualification/components/QualificationTableHeader.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function QualificationTableHeader() {
  const { t } = useLanguage();

  const headers = [
    { key: "no", label: "No" },
    { key: "expiration", label: "Expiration" },
    { key: "certificateName", label: "Certificate Name" },
    { key: "trainingDate", label: "Training Date" },
    { key: "expireDate", label: "Expire Date" },
    { key: "licenseNumber", label: "License Number" },
    { key: "remarks", label: "Remarks" },
    { key: "actions", label: "Actions", align: "center" },
  ];

  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headers.map((header) => (
          <th
            key={header.key}
            className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              header.align === "center" ? "text-center" : "text-left"
            }`}
          >
            {t(header.key) || header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}