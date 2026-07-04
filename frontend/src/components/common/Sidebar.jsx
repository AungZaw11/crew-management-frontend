// src/components/common/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import suganLogo from "../../assets/icons/Logo.png";

export default function Sidebar({
  collapsed,
  setCollapsed,
  isMobile = false,
  onClose,
}) {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Crew Management", path: "/crew" },
    { icon: FileText, label: "Register", path: "/register" },
    { icon: CreditCard, label: "Payment", path: "/payment" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActive = (path) => {
    return (
      location.pathname.startsWith(path) ||
      (path === "/crew" && location.pathname === "/")
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ==================== Mobile Sidebar ====================
  if (isMobile) {
    return (
      <div className="bg-brand-dark h-full flex flex-col w-full rounded-r-[20px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-white/60 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Mobile Logo */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={suganLogo}
                alt="Sungan Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">
              Sungan
            </span>
          </div>
        </div>

        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  // ==================== Desktop Sidebar ====================
  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="bg-brand-dark min-h-screen flex flex-col rounded-r-[30px] relative z-20 transition-all duration-300 ease-in-out flex-shrink-0"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-white rounded-full p-1 shadow-md text-brand-dark hover:bg-gray-50 z-30 hidden sm:block"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Desktop Logo */}
      <div className="h-20 flex items-center justify-center border-b border-white/10 px-4">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-25 h-25 bg-#002F67 rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={suganLogo}
                alt="Sungan Logo"
                className="w-15 h-15 object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={suganLogo}
              alt="Sungan Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex-1 py-8 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors relative ${
                active
                  ? "text-text-main"
                  : "text-brand-lighter hover:bg-white/10"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-l-full rounded-r-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-4">
                <item.icon
                  size={20}
                  className={active ? "text-text-main" : "text-brand-lighter"}
                />
                {!collapsed && (
                  <span
                    className={`font-medium whitespace-nowrap ${
                      active ? "font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-brand-lighter hover:bg-white/10 transition-colors w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
