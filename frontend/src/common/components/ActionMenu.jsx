// src/components/ui/ActionMenu.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "../../common/hooks/LanguageContext";  

export default function ActionMenu({ crewId, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    onDelete(crewId);
    setShowDeleteModal(false);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded hover:bg-gray-100 text-text-main transition-colors"
      >
        <MoreHorizontal size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-36 bg-white rounded-md shadow-dropdown border border-gray-200 py-2 z-50"
          >
            <Link
              to={`/crew/${crewId}?edit=true`}
              className="flex items-center gap-3 px-4 py-2 text-sm text-text-main hover:bg-gray-50 w-full text-left"
            >
              <Edit2 size={14} /> Edit
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowDeleteModal(true);
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-accent-red hover:bg-red-50 w-full text-left"
            >
              <Trash2 size={14} /> Delete
            </button>
            <Link
              to={`/crew/${crewId}`}
              className="flex items-center gap-3 px-4 py-2 text-sm text-brand-light hover:bg-brand-lighter/50 w-full text-left"
            >
              <Eye size={14} /> View
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-md shadow-xl border border-gray-200 w-full max-w-md p-8 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-lighter flex items-center justify-center mb-6">
                <AlertTriangle className="text-brand" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Are you sure you want to delete?
              </h3>
              <p className="text-sm text-text-main mb-8 max-w-[280px]">
                Do you really want to delete this records? This process cannot
                be undone.
              </p>
              <div className="flex gap-4 w-full justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 rounded-md border border-gray-200 text-text-main font-medium hover:bg-gray-50 transition-colors w-32"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 rounded-md bg-accent-red text-white font-medium hover:bg-red-600 transition-colors w-32"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
