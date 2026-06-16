// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, FileText, Settings, LogOut, Anchor } from 'lucide-react';

const menuItems = [
    { path: '/overview', name: 'Overview', icon: LayoutDashboard },
    { path: '/crew', name: 'Crew Management', icon: Users },
    { path: '/calendar', name: 'Calendar', icon: CalendarDays },
    { path: '/reports', name: 'Reports', icon: FileText },
    { path: '/settings', name: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen = true, onToggle }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    if (!isOpen) {
        return (
            <div className="w-16 bg-surface border-r border-border h-screen fixed left-0 top-0 z-40 flex flex-col items-center py-4">
                {/* Logo - matches TopNav */}
                <div className="flex flex-col items-center gap-1 mb-8">
                    <Anchor className="w-6 h-6 text-brand-navy" />
                    <span className="text-[10px] font-bold text-brand-navy">S</span>
                </div>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-10 h-10 flex items-center justify-center rounded-lg mb-2 transition-colors ${isActive
                                ? 'bg-brand-blue text-white'
                                : 'text-text-light hover:bg-brand-light hover:text-brand-navy'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                    </NavLink>
                ))}

                <button
                    onClick={handleLogout}
                    className="w-10 h-10 flex items-center justify-center rounded-lg mt-auto text-text-light hover:bg-red-50 hover:text-status-red transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="w-64 bg-surface border-r border-border h-screen fixed left-0 top-0 z-40 flex flex-col">
            {/* Logo - matches TopNav style */}
            <div className="h-[80px] flex items-center px-6 border-b border-border">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-xl tracking-tight">
                    <Anchor className="w-6 h-6" />
                    <span>SUNGAN</span>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-6 px-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${isActive
                                ? 'bg-brand-blue text-white'
                                : 'text-text hover:bg-brand-light hover:text-brand-navy'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-text-light hover:bg-red-50 hover:text-status-red transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
                <div className="text-xs text-text-light text-center mt-4">
                    Version 1.0.0
                </div>
            </div>
        </div>
    );
}