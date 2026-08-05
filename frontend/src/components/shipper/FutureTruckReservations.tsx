import React, { useState } from 'react';
import { Sparkles, Clock, MapPin, ShieldCheck, CheckCircle2, Calendar, Navigation, ArrowRight } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { TrustBadge } from '../common/TrustBadge';
import { useApp } from '../../context/AppContext';

export const FutureTruckReservations: React.FC = () => {
  const { predictions, reserveFutureTruck } = useApp();
  const [activeHorizon, setActiveHorizon] = useState<'all' | '1h' | '6h' | '24h' | '3d'>('all');
  const [reservedIds, setReservedIds] = useState<string[]>([]);

  const filtered = activeHorizon === 'all'
    ? predictions
    : predictions.filter(p => p.time_horizon === activeHorizon);

  const handleReserve = (id: string) => {
    reserveFutureTruck(id);
    setReservedIds(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Title & Horizon Filter */}
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> ⭐ Unique AI Feature
            </span>
            <h2 className="text-lg font-bold text-white">AI Future Truck Availability Forecast</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gemini predicts incoming trucks finishing deliveries. Reserve empty return capacity before trucks even arrive!
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['all', '1h', '6h', '24h', '3d'] as const).map(horizon => (
            <button
              key={horizon}
              onClick={() => setActiveHorizon(horizon)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeHorizon === horizon
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {horizon === 'all' ? 'All Forecasts' : horizon}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Grid of Predicted Incoming Trucks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(pred => {
          const isReserved = reservedIds.includes(pred.id);
          const availTime = new Date(pred.predicted_available_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <GlassCard key={pred.id} hoverEffect className="flex flex-col justify-between border-purple-500/20">
              <div>
                {/* Time Horizon Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 font-extrabold text-xs border border-purple-500/30 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" /> Available in ~{pred.time_horizon} ({availTime})
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Match Prob: {pred.match_probability}%
                  </span>
                </div>

                {/* Truck & Driver Info */}
                <div className="my-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{pred.truck_number}</h3>
                    <span className="text-xs text-slate-400">{pred.truck_type}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Driver: <b className="text-white">{pred.driver_name}</b></span>
                    <TrustBadge score={pred.trust_score} confidence={98} size="sm" />
                  </div>

                  {/* Route Progress */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center text-slate-400">
                        <Navigation className="w-3.5 h-3.5 mr-1 text-purple-400" />
                        Live Status
                      </span>
                      <span className="text-purple-300 font-medium">{pred.current_delivery_status}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                      <span className="text-slate-400">Target Hub: <b className="text-slate-200">{pred.target_destination_city}</b></span>
                      <span className="text-xs font-bold text-cyan-400">{pred.remaining_km} km remaining</span>
                    </div>
                  </div>
                </div>

                {/* Cost Estimate */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 mb-4">
                  <span className="text-xs text-slate-400">Est Freight Cost</span>
                  <span className="text-base font-extrabold text-emerald-400">
                    ₹{pred.expected_freight_cost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Advance Reservation Action */}
              <div>
                {isReserved ? (
                  <button disabled className="w-full py-2.5 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center space-x-1.5 border border-purple-500/40">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Advance Reservation Locked</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleReserve(pred.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Reserve Truck Before Arrival (₹{pred.expected_freight_cost.toLocaleString()})</span>
                  </button>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
