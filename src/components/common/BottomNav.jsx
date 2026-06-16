// src/components/common/BottomNav.jsx
import React from 'react';
import { Anchor } from 'lucide-react';
import Logo from '../../assets/icons/Sungan Shipping Logo.png';


export default function BottomNav() {
    return (
        <footer className="h-[56px] bg-surface-off border-t border-border flex items-center justify-center gap-6 px-6 mt-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 text-brand-navy font-bold text-xl tracking-tight">

                <img src={Logo} alt="SUNGAN Logo" className="w-15 h-15  object-contain" />

            </div>

            {/* Copyright & Links */}
            <p className="text-xs text-text-light tracking-wide">
                © 2026 SUNGAN Ocean. All rights reserved. Version 1.0.0 ·{' '}
                <a href="#" className="hover:text-text transition-colors">
                    Privacy Policy
                </a>{' '}
                |{' '}
                <a href="#" className="hover:text-text transition-colors">
                    Terms
                </a>{' '}
                |{' '}
                <a href="#" className="hover:text-text transition-colors">
                    Support
                </a>
            </p>
        </footer>
    );
}