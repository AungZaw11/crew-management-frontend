// src/common/components/Table/Table.jsx
import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table({
  columns = [],
  data = [],
  actions = null,
  onRowClick = null,
  isLoading = false,
  emptyMessage = "No data found",
  className = "",
  filterOptions = [],
  filterValue = "",
  onFilterChange = null,
  filterLabel = "Filter",
  selectedIds = [],
  onSelectAll = null,
  onSelectRow = null,
  onDeleteSelected = null,
  showCheckbox = false,
  showMiniTabs = false,
  miniTabs = [],
  activeMiniTab = "",
  onMiniTabChange = null,
  miniTabLabel = "View",
}) {
  if (isLoading) {
    return (
      <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
        {/* Header Skeleton */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {showCheckbox && (
                  <th className="px-4 py-3 text-center w-10">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  </th>
                )}
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center w-16">
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gray-100">
                  {showCheckbox && (
                    <td className="px-4 py-3 text-center">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Skeleton */}
        <div className="px-4 py-2.5 border-t border-gray-200 bg-gray-50">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`border border-gray-200 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className={`border border-gray-200 rounded-lg overflow-visible ${className}`}>
      {/* Header with Mini Tabs, Filter & Delete Button */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-6">
          {showMiniTabs && miniTabs.length > 0 && onMiniTabChange && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">{miniTabLabel}:</span>
              <div className="flex gap-1 bg-white rounded-md border border-gray-200 p-0.5">
                {miniTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => onMiniTabChange(tab.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activeMiniTab === tab.key
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter - Optional */}
          {filterOptions.length > 0 && onFilterChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{filterLabel}:</span>
              <select
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Delete Selected Button */}
        {onDeleteSelected && selectedIds.length > 0 && (
          <button
            onClick={() => onDeleteSelected(selectedIds)}
            className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <span>Delete Selected ({selectedIds.length})</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <TableHeader
            columns={columns}
            showCheckbox={showCheckbox}
            onSelectAll={onSelectAll}
            isAllSelected={isAllSelected}
          />
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={item.id || index}
                item={item}
                index={index}
                columns={columns}
                actions={actions}
                onRowClick={onRowClick}
                showCheckbox={showCheckbox}
                isSelected={selectedIds.includes(item.id)}
                onSelect={() => onSelectRow?.(item.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
        Showing {data.length} entries
      </div>
    </div>
  );
}