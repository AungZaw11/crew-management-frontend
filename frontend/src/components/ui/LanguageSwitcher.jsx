// src/components/ui/LanguageSwitcher.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import api from "../../services/api"; // ✅ Import api

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang) => {
    // 1. Update context
    setLanguage(lang);

    // 2. Update localStorage
    localStorage.setItem("language", lang);

    // 3.  Update axios default header for all future requests
    api.defaults.headers.language = lang;

    // 4.  Update all existing request interceptors
    api.interceptors.request.use(
      (config) => {
        config.headers.language = lang;
        return config;
      },
      (error) => Promise.reject(error),
    );

    console.log("Language changed to:", lang);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 sm:gap-2 bg-brand-light px-2 py-1 sm:px-3 sm:py-1.5 rounded-[4px] hover:bg-blue-100 transition-colors text-xs sm:text-sm">
        <span className="font-medium text-text">{language.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-brand-muted" />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
            language === "en" ? "text-brand font-semibold" : "text-text-main"
          }`}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => handleLanguageChange("kr")}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
            language === "kr" ? "text-brand font-semibold" : "text-text-main"
          }`}
        >
          🇰🇷 한국어
        </button>
      </div>
    </div>
  );
}
