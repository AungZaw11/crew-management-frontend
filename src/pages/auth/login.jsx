// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ChevronDown, Anchor } from 'lucide-react';
import { Wave } from '../../components/ui/Wave';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify({ name: 'Admin', role: 'ADMIN' }));
        navigate('/overview');
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-light to-[#4F74BD]">
            <Wave />

            <div
                className="w-full max-w-[558px] bg-surface rounded-[10px] shadow-card p-10 z-10 relative mx-4 animate-scale-in"
            >
                {/* Top Row: Logo & Language */}
                <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-8" />
                    <div className="flex flex-col items-center gap-2 text-brand-navy">
                        <Anchor className="w-12 h-12" />
                    </div>
                    <button className="flex items-center gap-2 bg-brand-light px-3 py-1.5 rounded-[4px] hover:bg-blue-100 transition-colors">
                        <span className="text-sm font-medium text-text">EN</span>
                        <ChevronDown className="w-4 h-4 text-brand-muted" />
                    </button>
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="font-serif text-2xl font-medium text-text tracking-tight">
                        Sign In
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-6 px-4 md:px-12">
                    {/* Username */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-[#434750]" />
                        </div>
                        <input
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-border rounded-[6px] bg-surface text-sm text-text placeholder-text-light focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-shadow"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-[#434750]" />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-border rounded-[6px] bg-surface text-sm text-text placeholder-text-light focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-shadow"
                            required
                        />
                    </div>

                    {/* Options Row */}
                    <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-3.5 h-3.5 rounded-[2px] border border-brand-blue bg-brand-blue flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs font-light text-text group-hover:text-brand-navy transition-colors">
                                Remember Me
                            </span>
                        </label>
                        <a href="#" className="text-xs font-light text-text hover:text-brand-navy transition-colors">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-brand-muted text-white font-semibold text-sm tracking-wide py-3 rounded-[6px] mt-6 hover:bg-brand-accent transition-colors shadow-sm"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}