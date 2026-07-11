// src/components/crew/DynamicTable.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../common/hooks/LanguageContext";
import api from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { DEMO_ROWS } from "../../config/tableConfigs";

export default function DynamicTable({
  config,
  tabName,
  crewId,
  onDelete,
  onBulkDelete,
  useDemoData = true,
  itemsPerPage = 10,
}) {
  const { t } = useLanguage();
  const { title, filters, showDelete, columns } = config;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  
  const getDemoData = () => {
    return DEMO_ROWS[tabName] || [];
  };

 
  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      if (useDemoData) {
        console.log(` Using demo data for ${tabName}`);
        const demoData = getDemoData();
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = demoData.slice(startIndex, endIndex);

        setRows(paginatedData);
        setTotalItems(demoData.length);
        setTotalPages(Math.ceil(demoData.length / itemsPerPage));
        setCurrentPage(page);
        setLoading(false);
        setSelectedRows([]);
        setSelectAll(false);
        return;
      }

      const endpoint = getEndpoint(tabName);
      console.log(` Fetching: /crew/${crewId}/${endpoint}`);

      const response = await api.get(`/crew/${crewId}/${endpoint}`, {
        params: {
          page: page - 1,
          size: itemsPerPage,
        },
      });

      const mappedRows =
        response.data.content?.map((item, index) => {
          return mapDataToColumns(item, tabName, index);
        }) || [];

      setRows(mappedRows);
      setTotalItems(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(page);
      setSelectedRows([]);
      setSelectAll(false);
    } catch (err) {
      console.error(`Failed to fetch ${tabName} data:`, err);

      const demoData = getDemoData();
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = demoData.slice(startIndex, endIndex);

      setRows(paginatedData);
      setTotalItems(demoData.length);
      setTotalPages(Math.ceil(demoData.length / itemsPerPage));
      setCurrentPage(page);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const getEndpoint = (tab) => {
    const endpoints = {
      Appointment: "appointments",
      Qualification: "qualifications",
      Replacement: "replacements",
      Payment: "payments",
      Family: "families",
      Injury: "injuries",
      Health: "health",
      Experiences: "experiences",
      Evaluation: "evaluations",
      Certificates: "certificates",
      Accident: "accidents",
    };
    return endpoints[tab] || tab.toLowerCase();
  };

  // ===== MAP API DATA TO TABLE COLUMNS =====
  const mapDataToColumns = (item, tab, index) => {
    const base = {
      id: String(index + 1).padStart(2, "0"),
    };

    switch (tab) {
      case "Appointment":
        return {
          ...base,
          division: item.division || "-",
          content: item.content || "-",
          ship: item.shipName || item.ship || "-",
          rank: item.rank || "-",
          boardingDate: item.boardingDate || "-",
          leavingDate: item.leavingDate || "-",
          boardingPeriod: item.boardingPeriod || "-",
          place: item.place || "-",
          remarks: item.remarks || "-",
        };

      case "Qualification":
        return {
          ...base,
          expiration: item.expiration || "-",
          certificate: item.certificateName || item.certificate || "-",
          trainingDate: item.trainingDate || "-",
          expireDate: item.expireDate || "-",
          license: item.licenseNumber || item.license || "-",
          remarks: item.remarks || "-",
        };

      case "Replacement":
        return {
          ...base,
          division: item.division || "-",
          content: item.content || "-",
          ship: item.shipName || item.ship || "-",
          rank: item.rank || "-",
          date: item.date || "-",
          place: item.place || "-",
          remarks: item.remarks || "-",
          send: item.send ? "Send Mail" : "-",
        };

      case "Payment":
        return {
          ...base,
          bank: item.bankName || item.bank || "-",
          account: item.accountNumber || item.account || "-",
          holder: item.holderName || item.holder || "-",
          relation: item.relation || "-",
        };

      case "Family":
        return {
          ...base,
          name: item.name || "-",
          relation: item.relation || "-",
          birth: item.birthDate || item.birth || "-",
          remarks: item.remarks || "-",
        };

      case "Injury":
        return {
          ...base,
          illness: item.illness || "-",
          medical: item.medicalName || item.medical || "-",
          hospital: item.hospital || "-",
          start: item.treatmentStartDate || item.start || "-",
          recovery: item.recoveryDate || item.recovery || "-",
          type: item.type || "-",
          expenseWon: item.expenseWon || "-",
          expenseEx: item.expenseEx || "-",
          remarks: item.remarks || "-",
        };

      case "Health":
        return {
          ...base,
          date: item.date || "-",
          size: item.size || "-",
          sight: item.sight || "-",
          hearing: item.hearing || "-",
          blood: item.blood || "-",
          decision: item.decision || "-",
        };

      case "Experiences":
        return {
          ...base,
          company: item.company || "-",
          ship: item.shipName || item.ship || "-",
          rank: item.rank || "-",
          boardingDate: item.boardingDate || "-",
          leavingDate: item.leavingDate || "-",
          area: item.area || "-",
          shipType: item.shipType || "-",
          boardLeave: item.boardLeave || "-",
        };

      default:
        return { ...base, ...item };
    }
  };

  // ===== HANDLE SELECT ALL =====
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIds = rows.map((row) => row.id);
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
  };

  // ===== HANDLE SELECT ROW =====
  const handleSelectRow = (rowId) => {
    setSelectedRows((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  // ===== HANDLE BULK DELETE =====
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;

    if (
      window.confirm(
        t("confirm_delete") ||
          "Are you sure you want to delete selected items?",
      )
    ) {
      try {
        if (onBulkDelete) {
          await onBulkDelete(selectedRows);
        } else {
          const endpoint = getEndpoint(tabName);
          for (const rowId of selectedRows) {
            await api.delete(`/crew/${crewId}/${endpoint}/${rowId}`);
          }
        }
        setSelectedRows([]);
        setSelectAll(false);
        fetchData(currentPage);
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  // ===== HANDLE PAGE CHANGE =====
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchData(page);
    }
  };

  // ===== INITIAL FETCH =====
  useEffect(() => {
    fetchData();
  }, [crewId, tabName]);

  if (loading) return <LoadingSpinner />;

  if (error && rows.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500">{error}</p>
        <button
          onClick={() => fetchData()}
          className="mt-4 px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Toolbar - No Add New button */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-semibold text-text-main">
            {title || tabName}
          </h3>
          {filters && filters.length > 0 && (
            <div className="flex items-center gap-2">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    index === 0
                      ? "bg-brand-dark text-white"
                      : "bg-gray-200 text-text-light hover:bg-gray-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {showDelete && selectedRows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
            >
              <span className="bg-red-100 px-2 py-0.5 rounded-full text-xs">
                {selectedRows.length}
              </span>
              {t("delete_selected") || "Delete Selected"}
            </button>
          )}
          {showDelete && selectedRows.length === 0 && (
            <button
              className="text-sm text-gray-400 cursor-not-allowed"
              disabled
            >
              {t("delete") || "Delete"}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {rows.length === 0 ? (
        <div className="text-center py-12 text-text-light">
          <p className="text-lg">No data available</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-sm font-semibold text-text-main">
                  {/* Checkbox Column */}
                  <th className="px-4 py-3 whitespace-nowrap w-10">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
                    />
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 whitespace-nowrap ${
                        col.align === "center" ? "text-center" : "text-left"
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    } ${selectedRows.includes(row.id) ? "bg-blue-50" : ""}`}
                  >
                    {/* Checkbox Cell */}
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
                      />
                    </td>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-sm ${
                          col.align === "center" ? "text-center" : "text-left"
                        }`}
                        style={col.color ? { color: col.color } : {}}
                      >
                        {row[col.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-light">
              {t("showing") || "Showing"} {rows.length} {t("of") || "of"}{" "}
              {totalItems} {t("entries") || "entries"}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("previous") || "Previous"}
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      page === currentPage
                        ? "bg-brand-dark text-white"
                        : "border border-gray-200 text-text-main hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-1 text-text-light">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-text-main hover:bg-gray-50"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("next") || "Next"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
