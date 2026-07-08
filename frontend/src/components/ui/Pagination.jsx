// src/components/ui/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPreviousNext = true,
}) {
  const { t } = useLanguage();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-4 justify-end">
      {showPreviousNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors ${
            currentPage === 1
              ? 'opacity-30 cursor-not-allowed hover:bg-transparent'
              : 'hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
      )}
      
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <div className="w-10 h-10 flex items-center justify-center rounded-[4px] text-black font-semibold tracking-widest">
              ...
            </div>
          ) : (
            <button
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors ${
                page === currentPage
                  ? 'text-brand-blue font-medium bg-blue-50'
                  : 'text-text-dark hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      
      {showPreviousNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors ${
            currentPage === totalPages
              ? 'opacity-30 cursor-not-allowed hover:bg-transparent'
              : 'hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      )}
    </div>
  );
}