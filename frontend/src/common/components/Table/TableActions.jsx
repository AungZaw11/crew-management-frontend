// src/common/components/Table/TableActions.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/LanguageContext";

export default function TableActions({
  item,
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
}) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isOpen) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.right + window.scrollX - 170,
        });
      }
    }
    
    setIsOpen(!isOpen);
  };

  const handleAction = (callback, actionName) => {
    console.log(`🔹 ${actionName} clicked for item:`, item?.id);
    setIsOpen(false);
    
    if (typeof callback === 'function') {
      callback(item);
    } else {
      console.warn(`⚠️ ${actionName} is not a function!`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Actions"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="fixed min-w-[170px] bg-white border border-gray-200 rounded-md shadow-lg z-[99999] py-1"
          style={{
            top: position.top,
            left: position.left,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {showView && onView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAction(onView, "View");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
            >
              <Eye size={16} />
              {t("view") || "View"}
            </button>
          )}
          {showEdit && onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAction(onEdit, "Edit");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
            >
              <Edit size={16} />
              {t("edit") || "Edit"}
            </button>
          )}
          {showDelete && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAction(onDelete, "Delete");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <Trash2 size={16} />
              {t("delete") || "Delete"}
            </button>
          )}
        </div>,
        document.body
      )}
    </>
  );
}