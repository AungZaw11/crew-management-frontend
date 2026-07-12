// src/common/components/Table/TableHeader.jsx
import React from "react";

export default function TableHeader({
  columns,
  showCheckbox = false,
  onSelectAll = null,
  isAllSelected = false,
}) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {/* Checkbox Column */}
        {showCheckbox && onSelectAll && (
          <th className="px-4 py-3 text-center w-10">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={onSelectAll}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </th>
        )}
        {columns.map((column, index) => (
          <th
            key={index}
            className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.align === "center" ? "text-center" : "text-left"
            } ${column.className || ""}`}
            style={{ width: column.width || "auto" }}
          >
            {column.label}
          </th>
        ))}
        {/* Actions Column */}
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
          Actions
        </th>
      </tr>
    </thead>
  );
}