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
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-slate-200 shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 font-extrabold text-xs border border-sky-200">
              Shipper Command Hub
            </span>
            <h1 className="text-2xl font-black text-slate-900">Welcome, {currentUser.company_name || currentUser.name}!</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Book empty return trucks instantly or reserve incoming trucks in advance using Gemini AI predictions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all"
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
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('future')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'future'
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>⭐ AI Future Availability & Advance Reservations</span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'active'
              ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4 text-sky-600" />
          <span>Posted Shipments</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'map'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4 text-emerald-600" />
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
