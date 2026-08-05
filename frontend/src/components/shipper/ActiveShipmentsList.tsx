import React from 'react';
import { Package, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

export const ActiveShipmentsList: React.FC = () => {
  const { shipments, bookings } = useApp();

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center">
          <Package className="w-4 h-4 text-cyan-400 mr-2" /> Active Posted Cargo Loads ({shipments.length})
        </h3>
        <span className="text-xs text-slate-400">Live Status Sync</span>
      </div>

      <div className="space-y-3">
        {shipments.map(s => {
          const booking = bookings.find(b => b.shipment_id === s.id);

          return (
            <div key={s.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                  <span>{s.pickup_city}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{s.drop_city}</span>
                </div>
                <p className="text-xs text-slate-400">
                  Cargo: <b className="text-slate-200">{s.material}</b> ({s.weight_tons} Tons) • {s.required_truck_type}
                </p>
              </div>

              <div className="flex items-center space-x-4 justify-between md:justify-end">
                <span className="text-sm font-extrabold text-emerald-400">₹{s.offered_price.toLocaleString()}</span>
                {s.status === 'reserved' || booking ? (
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Reserved
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" /> Open for Matches
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
