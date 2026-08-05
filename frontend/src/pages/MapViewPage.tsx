import React from 'react';
import { MapPin, Truck, Package, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useApp } from '../context/AppContext';

export const MapViewPage: React.FC = () => {
  const { trucks, shipments, predictions } = useApp();

  return (
    <div className="space-y-4">
      <GlassCard glow className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-emerald-400" />
          <div>
            <h1 className="text-lg font-bold text-white">Interactive Freight Logistics Map</h1>
            <p className="text-xs text-slate-400">Live GPS tracking of return trucks, cargo shipments, and future predicted arrivals</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="text-emerald-400 font-bold">🚚 {trucks.length} Trucks</span>
          <span className="text-amber-400 font-bold">📦 {shipments.length} Loads</span>
          <span className="text-purple-400 font-bold">⚡ {predictions.length} Future Predictions</span>
        </div>
      </GlassCard>

      <InteractiveMap trucks={trucks} shipments={shipments} predictions={predictions} height="calc(100vh - 220px)" />
    </div>
  );
};
