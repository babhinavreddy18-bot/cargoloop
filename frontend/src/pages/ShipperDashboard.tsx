import React, { useState } from 'react';
import { Package, Sparkles, Plus, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { StatCard } from '../components/common/StatCard';
import { FutureTruckReservations } from '../components/shipper/FutureTruckReservations';
import { ActiveShipmentsList } from '../components/shipper/ActiveShipmentsList';
import { PostShipmentModal } from '../components/shipper/PostShipmentModal';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useApp } from '../context/AppContext';

export const ShipperDashboard: React.FC = () => {
  const { shipments, predictions, trucks, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'future' | 'active' | 'map'>('future');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/30">
              Shipper Command Hub
            </span>
            <h1 className="text-2xl font-black text-white">Welcome, {currentUser.company_name || currentUser.name}!</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Book empty return trucks instantly or reserve incoming trucks in advance using Gemini AI predictions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Cargo Shipment</span>
          </button>
        </div>
      </GlassCard>

      {/* Shipper Quick KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Active Posted Loads"
          value={`${shipments.length} Active`}
          change="Broadcasting to return trucks"
          isPositive={true}
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Predicted Future Trucks"
          value={`${predictions.length} Incoming`}
          change="Available for Advance Booking"
          isPositive={true}
          icon={Sparkles}
          color="purple"
        />
        <StatCard
          title="Est Freight Savings"
          value="35% Saved"
          change="vs Standard One-Way Rates"
          isPositive={true}
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('future')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'future'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>⭐ AI Future Availability & Advance Reservations</span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'active'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Posted Shipments</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'map'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Freight Logistics Map</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'future' && <FutureTruckReservations />}
      {activeTab === 'active' && <ActiveShipmentsList />}
      {activeTab === 'map' && <InteractiveMap trucks={trucks} shipments={shipments} predictions={predictions} height="520px" />}

      <PostShipmentModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
    </div>
  );
};
