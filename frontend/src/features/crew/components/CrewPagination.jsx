// src/features/crew/components/CrewPagination.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function CrewPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const { t } = useLanguage();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="px-4 py-3 border-t border-gray-200 flex flex-wrap justify-between items-center gap-3">
      <p className="text-sm text-text-light">
        {t("showing") || "Showing"} {Math.min((currentPage - 1) * pageSize + 1, totalItems)} -{" "}
        {Math.min(currentPage * pageSize, totalItems)} {t("of") || "of"} {totalItems}{" "}
        {t("entries") || "entries"}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-text-main hover:bg-gray-100"
          }`}
        >
          {t("previous") || "Prev"}
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              currentPage === page
                ? "bg-brand-dark text-white"
                : "text-text-main hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-text-main hover:bg-gray-100"
          }`}
        >
          {t("next") || "Next"}
        </button>
      </div>
    </div>
  );
}