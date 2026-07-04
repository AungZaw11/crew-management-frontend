import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Anchor, Search, SlidersHorizontal, ChevronDown, Bell } from 'lucide-react';
import Logo from '../../assets/icons/Sungan Shipping Logo.png';


export default function TopNav() {
    const location = useLocation();
    const isDashboardActive = location.pathname === '/overview' || location.pathname === '/calendar';
    const isCrewActive = location.pathname === '/crew';

    return (
        <header className="h-[80px] bg-surface border-b border-border flex items-center px-6 md:px-[60px] justify-between sticky top-0 z-50">
            <div className="flex items-center gap-10 md:gap-[86px] h-full">
                {/* Logo */}


                <div className="flex items-center gap-2 text-brand-navy font-bold text-xl tracking-tight">

                    <img src={Logo} alt="SUNGAN Logo" className="w-15 h-15  object-contain" />

                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-8 h-full relative">
                    <NavLink
                        to="/overview"
                        className={({ isActive }) =>
                            `relative h-full flex items-center font-medium text-base tracking-wide transition-colors ${isActive ? 'text-text' : 'text-text-light hover:text-text'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/crew"
                        className={({ isActive }) =>
                            `relative h-full flex items-center font-medium text-base tracking-wide transition-colors ${isActive ? 'text-text' : 'text-text-light hover:text-text'
                            }`
                        }
                    >
                        Crew Management
                    </NavLink>
                </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block w-[256px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-[18px] w-[18px] text-text-light" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Crew..."
                        className="block w-full pl-10 pr-3 py-2 border border-border rounded-[4px] bg-surface text-sm placeholder-text-light focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue"
                    />
                </div>

                {/* Notification Icon */}
                <button className="p-2 text-text hover:bg-brand-light rounded-md transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-status-red rounded-full"></span>
                </button>

                {/* Filter Icon */}
                <button className="p-2 text-text hover:bg-brand-light rounded-md transition-colors">
                    <SlidersHorizontal className="w-5 h-5" />
                </button>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full border border-border overflow-hidden flex-shrink-0 bg-brand-light flex items-center justify-center">
                    <span className="text-sm font-medium text-brand-navy">A</span>
                </div>

                {/* Language Dropdown */}
                <button className="flex items-center gap-2 bg-brand-light px-3 py-1.5 rounded-[4px] ml-2 hover:bg-blue-100 transition-colors">
                    <span className="text-sm font-medium text-text">EN</span>
                    <ChevronDown className="w-4 h-4 text-brand-muted" />
                </button>
            </div>
        </header>
    );
}