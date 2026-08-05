import React from 'react';
import { Sparkles, TrendingUp, DollarSign, Fuel, AlertCircle } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const BusinessInsightsCard: React.FC = () => {
  return (
    <GlassCard glow className="border-emerald-200 bg-white shadow-md">
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
          <Sparkles className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Gemini Fleet Optimization Business Insights</h3>
          <p className="text-xs text-slate-500 font-medium">Automated strategic recommendations for fleet operational efficiency</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs font-black text-emerald-700 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600" /> High Yield Corridor Focus
          </span>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Mumbai-Pune corridor empty return rates dropped by 84%. Redirect 6 multi-axle containers towards Bhiwandi hub to capture high-margin auto component backhauls.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs font-black text-sky-700 flex items-center">
            <Fuel className="w-3.5 h-3.5 mr-1 text-sky-600" /> Fuel Expenditure Saved
          </span>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Avoided 14,200 km of unladen haulage this month. Saved approx ₹2,84,000 in diesel expenditure and reduced fleet maintenance cycles by 12%.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs font-black text-indigo-700 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Advance Reservation Uplift
          </span>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Advance truck reservations contributed to 38% of total month revenue. 94% of incoming trucks are booked 4 hours before completing current delivery.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
