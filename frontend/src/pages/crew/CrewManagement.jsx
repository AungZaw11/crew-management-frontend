import React from 'react';
import { Download, Plus, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CREW_DATA = [
    { id: '01', vessel: 'HS Glory', rank: 'Deck', code: 'P006472', name: 'Tun Tun', validity: 'Major Requirements', division: 'Passport', type: '2026-02-11', remaining: -459, isRed: true },
    { id: '02', vessel: 'Ocean Star', rank: 'Engine', code: 'E008192', name: 'Kyaw Zin', validity: 'Medical Cert', division: 'Health', type: '2026-05-20', remaining: 45, isRed: false },
    { id: '03', vessel: 'HS Glory', rank: 'Deck', code: 'P006473', name: 'Aung Ko Htet', validity: 'Seaman Book', division: 'License', type: '2026-01-15', remaining: -12, isRed: true },
    { id: '04', vessel: 'Sea Breeze', rank: 'Galley', code: 'G002114', name: 'Mg Mg Lwin', validity: 'Food Handling', division: 'Safety', type: '2026-08-10', remaining: 120, isRed: false },
    { id: '05', vessel: 'Ocean Star', rank: 'Deck', code: 'P006475', name: 'Ye Phyo Win', validity: 'Major Requirements', division: 'Passport', type: '2025-12-01', remaining: -85, isRed: true },
    { id: '06', vessel: 'HS Glory', rank: 'Engine', code: 'E008195', name: 'Htoo Htoo', validity: 'Competency', division: 'License', type: '2026-11-22', remaining: 215, isRed: false },
    { id: '07', vessel: 'Sea Breeze', rank: 'Deck', code: 'P006478', name: 'Zaw Min', validity: 'Major Requirements', division: 'Passport', type: '2026-03-01', remaining: -5, isRed: true },
    { id: '08', vessel: 'Ocean Star', rank: 'Galley', code: 'G002118', name: 'Win Naing', validity: 'Medical Cert', division: 'Health', type: '2026-09-15', remaining: 150, isRed: false },
];

export default function CrewManagement() {
    return (
        <div className="w-full flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium text-text tracking-wide">Crew Management</h1>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-brand-muted rounded-[6px] bg-surface text-sm text-text hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-brand-accent rounded-[6px] text-sm text-white hover:bg-brand-navy transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Crew
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-surface border border-border rounded-[6px] shadow-card overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-border flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-text tracking-wide">Vessel's Name</span>
                        <ChevronDown className="w-4 h-4 text-text" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-text tracking-wide">Crew Class</span>
                        <ChevronDown className="w-4 h-4 text-text" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-text tracking-wide">Rank</span>
                        <ChevronDown className="w-4 h-4 text-text" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-text tracking-wide">Sign On</span>
                        <ChevronDown className="w-4 h-4 text-text" />
                    </div>
                    <div className="flex items-center gap-8 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-text tracking-wide">Name</span>
                        <ChevronDown className="w-4 h-4 text-text" />
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 border border-border rounded-[6px] bg-surface cursor-pointer hover:bg-gray-50 transition-colors ml-auto">
                        <span className="text-xs text-text tracking-wide">2026-03-07 - 2026-07-31</span>
                        <CalendarIcon className="w-4 h-4 text-text" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-light/64 border-b border-border">
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">No</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Boarding Vessel</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Rank</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Seaman Code</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Name</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Validity</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Division</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Type</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Remaining</th>
                                <th className="py-3 px-4 text-sm font-medium text-black tracking-wide whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CREW_DATA.map((crew, index) => (
                                <tr key={crew.id} className={`border-b border-border/50 hover:bg-gray-50 transition-colors ${index % 2 === 1 ? 'bg-surface-off' : 'bg-surface'}`}>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.id}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.vessel}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.rank}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.code}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.name}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark max-w-[120px] truncate" title={crew.validity}>{crew.validity}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.division}</td>
                                    <td className="py-3 px-4 text-sm text-text-dark">{crew.type}</td>
                                    <td className={`py-3 px-4 text-sm font-medium ${crew.isRed ? 'text-status-red' : 'text-text-dark'}`}>{crew.remaining}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <Link to="#" className="text-brand-navy hover:underline font-medium whitespace-nowrap">View Details →</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}