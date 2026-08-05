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
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-slate-200 shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200 flex items-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" /> ⭐ Unique AI Feature
            </span>
            <h2 className="text-lg font-black text-slate-900">AI Future Truck Availability Forecast</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Gemini predicts incoming trucks finishing deliveries. Reserve empty return capacity before trucks even arrive!
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['all', '1h', '6h', '24h', '3d'] as const).map(horizon => (
            <button
              key={horizon}
              onClick={() => setActiveHorizon(horizon)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeHorizon === horizon
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
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
            <GlassCard key={pred.id} hoverEffect className="flex flex-col justify-between border-slate-200 bg-white shadow-sm">
              <div>
                {/* Time Horizon Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 font-extrabold text-xs border border-indigo-200 flex items-center shadow-2xs">
                      <Clock className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Available in ~{pred.time_horizon} ({availTime})
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                    Match Prob: {pred.match_probability}%
                  </span>
                </div>

                {/* Truck & Driver Info */}
                <div className="my-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900">{pred.truck_number}</h3>
                    <span className="text-xs text-slate-500 font-medium">{pred.truck_type}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                    <span>Driver: <b className="text-slate-900">{pred.driver_name}</b></span>
                    <TrustBadge score={pred.trust_score} confidence={98} size="sm" />
                  </div>

                  {/* Route Progress */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-700">
                      <span className="flex items-center text-slate-500 font-semibold">
                        <Navigation className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                        Live Status
                      </span>
                      <span className="text-indigo-900 font-extrabold">{pred.current_delivery_status}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                      <span className="text-slate-500 font-medium">Target Hub: <b className="text-slate-900 font-bold">{pred.target_destination_city}</b></span>
                      <span className="text-xs font-black text-sky-700">{pred.remaining_km} km remaining</span>
                    </div>
                  </div>
                </div>

                {/* Cost Estimate */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 border border-slate-200 mb-4">
                  <span className="text-xs text-slate-500 font-extrabold uppercase">Est Freight Cost</span>
                  <span className="text-base font-black text-emerald-700">
                    ₹{pred.expected_freight_cost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Advance Reservation Action */}
              <div>
                {isReserved ? (
                  <button disabled className="w-full py-2.5 rounded-xl bg-indigo-50 text-indigo-800 font-extrabold text-xs flex items-center justify-center space-x-1.5 border border-indigo-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Advance Reservation Locked</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleReserve(pred.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5"
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
