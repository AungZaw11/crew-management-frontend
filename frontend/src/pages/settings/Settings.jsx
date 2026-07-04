// src/pages/settings/Settings.jsx
import React, { useState } from "react";
import {
  Save,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Ship,
  Users,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "vessels", label: "Vessels", icon: Ship },
    { id: "users", label: "User Management", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="flex-1 p-4 sm:p-8 flex flex-col gap-6">
            <h2 className="text-base sm:text-lg font-medium text-text-main border-b border-gray-200 pb-4">
              General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Sungan Shipping"
                  className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Default Currency
                </label>
                <select className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none bg-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>SGD (S$)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Timezone
                </label>
                <select className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none bg-white">
                  <option>UTC+08:00 (Singapore)</option>
                  <option>UTC+00:00 (London)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Date Format
                </label>
                <select className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none bg-white">
                  <option>YYYY-MM-DD</option>
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 p-4 sm:p-8">
            <p className="text-text-light text-sm">Content for {activeTab}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-full mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-medium text-text-main">
          System Settings
        </h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-xs sm:text-sm font-medium">
          <Save size={14} className="sm:w-4 sm:h-4" /> Save
        </button>
      </div>

      <div className="bg-white rounded-md border border-gray-200 shadow-card flex flex-col md:flex-row">
        <div className="w-full md:w-56 lg:w-64 border-r border-gray-200 p-3 sm:p-4 flex flex-row md:flex-col gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-md text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-brand-lighter text-brand font-medium"
                    : "hover:bg-gray-50 text-text-main"
                }`}
              >
                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
