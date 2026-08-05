import React, { useState } from 'react';
import { Sparkles, MapPin, IndianRupee, Fuel, Leaf, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { TrustBadge } from '../common/TrustBadge';
import { useApp } from '../../context/AppContext';

export const RecommendedLoads: React.FC = () => {
  const { trucks, aiMatches, runAIMatchingForTruck, createBooking, aiThinking } = useApp();
  const [selectedTruckId, setSelectedTruckId] = useState<string>(trucks[0]?.id || '');
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  const handleRunMatching = () => {
    if (selectedTruckId) {
      runAIMatchingForTruck(selectedTruckId);
    }
  };

  const handleAcceptLoad = (shipmentId: string, truckId: string, cost: number) => {
    createBooking(shipmentId, truckId, cost);
    setBookedIds(prev => [...prev, shipmentId]);
  };

  return (
    <div className="space-y-6">
      {/* Header Controller */}
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-slate-200 shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900">AI Return Load Optimization Engine</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Gemini analyzes truck GPS, destination, traffic, and cargo weight to calculate high-margin return loads.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedTruckId}
            onChange={e => setSelectedTruckId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
          >
            {trucks.map(t => (
              <option key={t.id} value={t.id}>
                {t.truck_number} ({t.current_city} → {t.dest_city})
              </option>
            ))}
          </select>

          <button
            onClick={handleRunMatching}
            disabled={aiThinking}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition-all"
          >
            {aiThinking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Re-Analyze Gemini AI</span>
              </>
            )}
          </button>
        </div>
      </GlassCard>

      {/* AI Match Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiMatches.map(match => {
          const shipment = match.shipment;
          if (!shipment) return null;

          const isBooked = bookedIds.includes(shipment.id);

          return (
            <GlassCard key={match.id} hoverEffect className="flex flex-col justify-between border-slate-200 bg-white shadow-sm">
              <div>
                {/* Score Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-200 flex items-center shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {match.match_score}% Gemini Match
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">ETA: {match.eta_hours}h</span>
                  </div>
                  <span className="text-lg font-black text-emerald-700">
                    ₹{shipment.offered_price.toLocaleString()}
                  </span>
                </div>

                {/* Route & Cargo */}
                <div className="my-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900">{shipment.pickup_city}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-slate-900">{shipment.drop_city}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Cargo: <b className="text-slate-900 font-bold">{shipment.material}</b> ({shipment.weight_tons} Tons)
                  </p>
                </div>

                {/* AI Rationale */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                  <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                    "{match.ai_recommendation_reason}"
                  </p>
                </div>

                {/* Profit Metrics breakdown */}
                <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-slate-100/70 border border-slate-200 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-extrabold">Expected Profit</span>
                    <span className="text-xs font-black text-emerald-700">+₹{match.expected_profit.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-extrabold">Extra Detour</span>
                    <span className="text-xs font-black text-sky-700">+{match.extra_distance_km} km</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-extrabold">CO₂ Saved</span>
                    <span className="text-xs font-black text-amber-700">{match.carbon_savings_kg} kg</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isBooked ? (
                  <button disabled className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold text-xs flex items-center justify-center space-x-1 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Return Load Confirmed</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAcceptLoad(shipment.id, selectedTruckId, shipment.offered_price)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Accept Return Load (₹{shipment.offered_price.toLocaleString()})</span>
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
