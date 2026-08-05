import React from 'react';
import { Truck, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0F19] border-t border-slate-800/80 py-8 px-4 lg:px-8 mt-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-200">CargoLoop SaaS Platform</span>
            <p className="text-[11px] text-slate-500">BackHaul AI – AI Powered Return Load Optimization & Advance Reservation Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> Gemini 2.5 Flash API Active
          </span>
          <span className="flex items-center text-purple-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Supabase Auth & PostgreSQL
          </span>
          <span className="flex items-center text-cyan-400">
            <Leaf className="w-3.5 h-3.5 mr-1" /> Carbon Emissions Saved
          </span>
        </div>

        <div className="text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} CargoLoop Inc. Production Ready SaaS.
        </div>
      </div>
    </footer>
  );
};
