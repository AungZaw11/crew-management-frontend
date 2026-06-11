import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
    return (
        <div className="flex items-center gap-2 mt-4 justify-end">
            <button className="w-10 h-10 flex items-center justify-center rounded-[4px] opacity-30 hover:bg-gray-100 transition-colors" disabled>
                <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-[4px] opacity-30 hover:bg-gray-100 transition-colors" disabled>
                <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-[4px] text-brand-blue font-medium">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-[4px] text-text-dark hover:bg-gray-50 transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-[4px] text-text-dark hover:bg-gray-50 transition-colors">3</button>
            <div className="w-10 h-10 flex items-center justify-center rounded-[4px] text-black font-semibold tracking-widest">...</div>
            <button className="w-10 h-10 flex items-center justify-center rounded-[4px] text-text-dark hover:bg-gray-50 transition-colors text-sm tracking-wide">99</button>
        </div>
    );
}