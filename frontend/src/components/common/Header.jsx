// src/components/common/Header.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import api from "../../services/api";

export default function Header({ onMobileMenuToggle, isMobileMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navLinks = [
    { path: "/dashboard", label: t("dashboard") },
    { path: "/crew", label: t("crew") },
    { path: "/register", label: t("register") },
    { path: "/payment", label: t("payment") },
    { path: "/settings", label: t("settings") },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  // ==================== LOGOUT ====================
  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await api.post("/logout", {
        user_id: user?.id || "",
        device_id: "",
      });

      if (response.data?.status) {
        toast.success(
          response.data.message || t("logout_success") || "Logout successful!",
        );
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(" Logout failed");
    } finally {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expire_date");

      // Language stays in localStorage
      // localStorage.removeItem('language');

      navigate("/login");
    }
  };

  return (
    <>
      <header className="h-16 sm:h-20 bg-surface-alt border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 sticky top-0 z-30">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
          >
            <span className="text-brand-dark font-bold text-sm sm:text-base md:text-lg tracking-wide hidden xs:block">
              {t("app_name")}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-text-main font-medium text-sm lg:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-brand transition-colors ${
                  isActive(link.path) ? "text-brand font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
          {/* Search - Desktop */}
          <div className="relative hidden lg:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
              size={16}
            />
            <input
              type="text"
              placeholder={t("search") + "..."}
              className="pl-9 pr-4 py-1.5 bg-surface-alt border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand w-32 xl:w-48 2xl:w-64 transition-all"
            />
          </div>

          {/* Search - Mobile Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Search size={18} />
          </button>

          {/* Notification */}
          <button className="text-text-main hover:text-brand transition-colors relative p-1.5">
            <Bell size={18} className="sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Avatar */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-lighter border border-gray-200 overflow-hidden cursor-pointer flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface-alt border-b border-gray-200 p-3 lg:hidden animate-fade-in-up">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
                size={16}
              />
              <input
                type="text"
                placeholder={t("search") + "..."}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
