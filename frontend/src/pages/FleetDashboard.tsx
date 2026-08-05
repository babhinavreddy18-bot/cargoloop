import React from 'react';
import { Truck, Sparkles, Clock, MapPin } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { FleetMetrics } from '../components/fleet/FleetMetrics';
import { AvailabilityTimeline } from '../components/fleet/AvailabilityTimeline';
import { BusinessInsightsCard } from '../components/fleet/BusinessInsightsCard';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useApp } from '../context/AppContext';

export const FleetDashboard: React.FC = () => {
  const { trucks, predictions, shipments, currentUser } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/30">
              Fleet Enterprise Control
            </span>
            <h1 className="text-2xl font-black text-white">Welcome, {currentUser.company_name || currentUser.name}!</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time fleet telemetry, backhaul match rate optimization, fuel conservation, and AI strategic forecasting.
          </p>
        </div>
      </GlassCard>

      {/* Fleet KPI Metrics Grid */}
      <FleetMetrics />

      {/* Gemini AI Strategic Business Insights */}
      <BusinessInsightsCard />

      {/* Future Availability Forecast Timeline */}
      <AvailabilityTimeline />

      {/* Interactive Fleet Telemetry Map */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center">
            <MapPin className="w-4 h-4 text-emerald-400 mr-2" /> Live Fleet Telemetry & Route Optimization Map
          </h3>
          <span className="text-xs text-slate-400">45 Active Vehicles GPS Synced</span>
        </div>
        <InteractiveMap trucks={trucks} shipments={shipments} predictions={predictions} height="480px" />
      </GlassCard>
    </div>
  );
};
