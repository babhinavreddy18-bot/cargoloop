import React from 'react';
import { MapPin, Truck, Package, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useApp } from '../context/AppContext';

export const MapViewPage: React.FC = () => {
  const { trucks, shipments, predictions } = useApp();

  return (
    <div className="space-y-4">
      <GlassCard glow className="flex items-center justify-between py-3 bg-white border-slate-200 shadow-md">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <div>
            <h1 className="text-lg font-black text-slate-900">Interactive Freight Logistics Map</h1>
            <p className="text-xs text-slate-500 font-medium">Live GPS tracking of return trucks, cargo shipments, and future predicted arrivals</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-extrabold">
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">🚚 {trucks.length} Trucks</span>
          <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">📦 {shipments.length} Loads</span>
          <span className="text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">⚡ {predictions.length} Future Predictions</span>
        </div>
      </GlassCard>

      <InteractiveMap trucks={trucks} shipments={shipments} predictions={predictions} height="calc(100vh - 220px)" />
    </div>
  );
};
