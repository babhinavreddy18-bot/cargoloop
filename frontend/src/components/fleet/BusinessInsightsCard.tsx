import React from 'react';
import { Sparkles, TrendingUp, DollarSign, Fuel, AlertCircle } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const BusinessInsightsCard: React.FC = () => {
  return (
    <GlassCard glow className="border-emerald-500/30">
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Gemini Fleet Optimization Business Insights</h3>
          <p className="text-xs text-slate-400">Automated strategic recommendations for fleet operational efficiency</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-emerald-400 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> High Yield Corridor Focus
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mumbai-Pune corridor empty return rates dropped by 84%. Redirect 6 multi-axle containers towards Bhiwandi hub to capture high-margin auto component backhauls.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-cyan-400 flex items-center">
            <Fuel className="w-3.5 h-3.5 mr-1" /> Fuel Expenditure Saved
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Avoided 14,200 km of unladen haulage this month. Saved approx ₹2,84,000 in diesel expenditure and reduced fleet maintenance cycles by 12%.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-purple-400 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> Advance Reservation Uplift
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Advance truck reservations contributed to 38% of total month revenue. 94% of incoming trucks are booked 4 hours before completing current delivery.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
