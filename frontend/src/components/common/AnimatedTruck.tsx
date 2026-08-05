import React from 'react';
import { Truck } from 'lucide-react';

export const AnimatedTruck: React.FC = () => {
  return (
    <div className="relative w-full h-9 overflow-hidden bg-slate-100/80 rounded-xl border border-slate-200 flex items-center px-4 shadow-xs">
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-30">
        <div className="h-[2px] w-full bg-slate-300"></div>
      </div>
      <div className="animate-truck-drive flex items-center space-x-2 text-emerald-600">
        <Truck className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]" />
        <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-emerald-800">
          GEMINI AI MATCHING LIVE
        </span>
      </div>
    </div>
  );
};
