// src/common/components/Table/TableRow.jsx
import React from "react";

export default function TableRow({
  item,
  index,
  columns,
  actions,
  onRowClick,
  isSelected = false,
  onSelect = null,
  showCheckbox = false,
}) {
  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
      } ${isSelected ? "bg-blue-50" : ""}`}
      onClick={handleRowClick}
    >
      {showCheckbox && onSelect && (
        <td className="px-4 py-3 text-center w-10" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td>
      )}

      {columns.map((column, colIndex) => {
        const value = column.key ? item[column.key] : null;
        const render = column.render || ((val) => val || "-");

        return (
          <td
            key={colIndex}
            className={`px-4 py-3 text-sm ${
              column.align === "center" ? "text-center" : "text-left"
            } ${column.className || ""}`}
          >
            {render(value, item)}
          </td>
        );
      })}

      {actions && (
        <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
          {actions.render(item)}
        </td>
      )}
    </tr>
  );
}   