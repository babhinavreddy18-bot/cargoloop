import React from 'react';
import { Clock, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

export const AvailabilityTimeline: React.FC = () => {
  const { predictions } = useApp();

  const horizons = ['1h', '6h', '24h', '3d'] as const;

  return (
    <GlassCard glow className="bg-white border-slate-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center">
            <Clock className="w-4 h-4 text-indigo-600 mr-2" /> Future Truck Availability Timeline
          </h3>
          <p className="text-xs text-slate-500 font-medium">Predicted empty return capacity across fleet horizons</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 font-extrabold shadow-2xs">
          Gemini Predictive Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {horizons.map(h => {
          const list = predictions.filter(p => p.time_horizon === h);
          return (
            <div key={h} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black uppercase text-indigo-700">{h} Horizon</span>
                <span className="text-[11px] font-extrabold text-slate-700">{list.length} Trucks</span>
              </div>

              <div className="space-y-2">
                {list.length === 0 ? (
                  <p className="text-[11px] text-slate-400 py-2 font-medium">No trucks predicted</p>
                ) : (
                  list.map(t => (
                    <div key={t.id} className="p-2 rounded-lg bg-white border border-slate-200 text-xs space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900">{t.truck_number}</span>
                        <span className="text-[10px] text-emerald-700 font-black">{t.match_probability}%</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">{t.current_location_city} → {t.target_destination_city}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
