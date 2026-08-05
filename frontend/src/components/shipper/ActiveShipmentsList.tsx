import React from 'react';
import { Package, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

export const ActiveShipmentsList: React.FC = () => {
  const { shipments, bookings } = useApp();

  return (
    <GlassCard className="bg-white border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center">
          <Package className="w-4 h-4 text-sky-600 mr-2" /> Active Posted Cargo Loads ({shipments.length})
        </h3>
        <span className="text-xs text-slate-500 font-semibold">Live Status Sync</span>
      </div>

      <div className="space-y-3">
        {shipments.map(s => {
          const booking = bookings.find(b => b.shipment_id === s.id);

          return (
            <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                  <span>{s.pickup_city}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                  <span>{s.drop_city}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Cargo: <b className="text-slate-900 font-bold">{s.material}</b> ({s.weight_tons} Tons) • {s.required_truck_type}
                </p>
              </div>

              <div className="flex items-center space-x-4 justify-between md:justify-end">
                <span className="text-sm font-black text-emerald-700">₹{s.offered_price.toLocaleString()}</span>
                {s.status === 'reserved' || booking ? (
                  <span className="text-xs font-extrabold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 flex items-center shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Reserved
                  </span>
                ) : (
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center shadow-2xs">
                    <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> Open for Matches
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
