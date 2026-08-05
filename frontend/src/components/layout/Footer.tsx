import React from 'react';
import { Truck, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-8 px-4 lg:px-8 mt-12 text-slate-500 text-xs shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900">CargoLoop SaaS Platform</span>
            <p className="text-[11px] text-slate-500">BackHaul AI – AI Powered Return Load Optimization & Advance Reservation Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-[11px] font-semibold">
          <span className="flex items-center text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Gemini 2.5 Flash API Active
          </span>
          <span className="flex items-center text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Supabase Auth & PostgreSQL
          </span>
          <span className="flex items-center text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
            <Leaf className="w-3.5 h-3.5 mr-1 text-sky-600" /> Carbon Emissions Saved
          </span>
        </div>

        <div className="text-[11px] text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} CargoLoop Inc. Production Ready SaaS.
        </div>
      </div>
    </footer>
  );
};

