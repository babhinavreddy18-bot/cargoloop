import React from 'react';
import { Truck } from 'lucide-react';

export const AnimatedTruck: React.FC = () => {
  return (
    <div className="relative w-full h-8 overflow-hidden bg-slate-950/40 rounded-lg border border-slate-800 flex items-center px-4">
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-20">
        <div className="h-[2px] w-full bg-dashed bg-emerald-500/50"></div>
      </div>
      <div className="animate-truck-drive flex items-center space-x-2 text-emerald-400">
        <Truck className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-emerald-300">
          GEMINI AI MATCHING LIVE
        </span>
      </div>
    </div>
  );
};
