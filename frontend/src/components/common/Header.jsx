// src/components/common/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ChevronDown, Bell, Menu, X, Anchor } from "lucide-react";

export default function Header({ onMobileMenuToggle, isMobileMenuOpen }) {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/crew", label: "Crew" },
    { path: "/register", label: "Register" },
    { path: "/payment", label: "Payment" },
    { path: "/settings", label: "Settings" },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <header className="h-16 sm:h-20 bg-surface-alt border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Navigation */}
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
            placeholder="Search Crew..."
            className="pl-9 pr-4 py-1.5 bg-surface-alt border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand w-32 xl:w-48 2xl:w-64 transition-all"
          />
        </div>

        {/* Search - Mobile Toggle */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Notification */}
        <button
          className="text-text-main hover:text-brand transition-colors relative p-1.5"
          aria-label="Notifications"
        >
          <Bell size={18} className="sm:w-5 sm:h-5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Language */}
        <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-1.5 py-1 rounded-md transition-colors">
          <span className="text-xs sm:text-sm font-medium text-text-main">
            EN
          </span>
          <ChevronDown size={14} className="text-text-main" />
        </div>

        {/* Avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-lighter border border-gray-200 overflow-hidden cursor-pointer flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface-alt border-b border-gray-200 p-3 lg:hidden animate-fade-in-up">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
              size={16}
            />
            <input
              type="text"
              placeholder="Search Crew..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
