// src/components/common/BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Anchor,
} from "lucide-react";
import suganLogo from "../../assets/icons/Logo.png";
import { useLanguage } from "../../context/LanguageContext";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/crew", label: "Crew", icon: Users },
    { path: "/register", label: "Register", icon: Calendar },
    { path: "/payment", label: "Payment", icon: CreditCard },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <>
      
      <div className="lg:hidden bg-surface-alt border-t border-gray-200 py-2 px-4 flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-md transition-colors ${
              isActive(item.path)
                ? "text-brand"
                : "text-text-light hover:text-brand"
            }`}
          >
            <item.icon
              size={20}
              className={isActive(item.path) ? "text-brand" : "text-text-light"}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      
      <div className="hidden lg:block bg-surface-alt border-t border-gray-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-light">
        
          <div className="flex items-center gap-2">
            <div className="w-25 h-25 bg-white rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={suganLogo}
                alt="Sungan Logo"
                className="w-15 h-15 object-contain"
              />
            </div>
          </div>
          
          <div className="text-center">
            © 2026 SUGAN Ocean. All rights reserved. Version 1.0.0
          </div>

          
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <a href="#" className="hover:text-brand-dark transition-colors">
              Privacy Policy
            </a>
            <span className="text-text-light/30">|</span>
            <a href="#" className="hover:text-brand-dark transition-colors">
              Terms
            </a>
            <span className="text-text-light/30">|</span>
            <a href="#" className="hover:text-brand-dark transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
