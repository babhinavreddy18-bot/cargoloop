import React from 'react';
import { Clock, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

export const AvailabilityTimeline: React.FC = () => {
  const { predictions } = useApp();

  const horizons = ['1h', '6h', '24h', '3d'] as const;

  return (
    <GlassCard glow>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center">
            <Clock className="w-4 h-4 text-purple-400 mr-2" /> Future Truck Availability Timeline
          </h3>
          <p className="text-xs text-slate-400">Predicted empty return capacity across fleet horizons</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
          Gemini Predictive Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {horizons.map(h => {
          const list = predictions.filter(p => p.time_horizon === h);
          return (
            <div key={h} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-extrabold uppercase text-purple-400">{h} Horizon</span>
                <span className="text-[11px] font-bold text-slate-300">{list.length} Trucks</span>
              </div>

              <div className="space-y-2">
                {list.length === 0 ? (
                  <p className="text-[11px] text-slate-500 py-2">No trucks predicted</p>
                ) : (
                  list.map(t => (
                    <div key={t.id} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{t.truck_number}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">{t.match_probability}%</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{t.current_location_city} → {t.target_destination_city}</p>
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
