import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-surface-off">
            {/* Top Navigation */}
            <TopNav />

            {/* Sidebar Toggle Button (Mobile) */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-brand-blue text-white p-3 rounded-full shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content */}
            <main
                className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
                    }`}
            >
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}