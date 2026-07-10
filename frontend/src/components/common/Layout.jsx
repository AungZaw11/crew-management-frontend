// src/components/common/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // ===== DEBUG: Log when Layout renders =====
  console.log("🔍 Layout rendering");
  console.log("🔍 Layout - children:", children);
  console.log("🔍 Layout - location:", location.pathname);

  useEffect(() => {
    console.log("🔍 Layout - location changed to:", location.pathname);
    setMobileSidebarOpen(false);
  }, [location]);

  // ===== RENDER CONTENT =====
  const renderContent = () => {
    if (children) {
      console.log("🔍 Layout - Rendering children");
      return children;
    }
    console.log("🔍 Layout - Rendering Outlet");
    return <Outlet />;
  };

  return (
    <div className="flex h-screen bg-surface-alt overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0 transition-all duration-300">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "280px" }}
      >
        <Sidebar
          collapsed={false}
          setCollapsed={() => {}}
          isMobile={true}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          isMobileMenuOpen={mobileSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto bg-surface-alt p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}