import React, { useState } from 'react';
import { Truck, ShieldCheck, Sparkles, MapPin, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { StatCard } from '../components/common/StatCard';
import { TrustBadge } from '../components/common/TrustBadge';
import { RecommendedLoads } from '../components/driver/RecommendedLoads';
import { DocumentUploader } from '../components/driver/DocumentUploader';
import { RegisterTruckModal } from '../components/driver/RegisterTruckModal';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useApp } from '../context/AppContext';

export const DriverDashboard: React.FC = () => {
  const { trucks, currentUser, shipments } = useApp();
  const [activeTab, setActiveTab] = useState<'matches' | 'documents' | 'map'>('matches');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const activeDriverTrucks = trucks.filter(t => t.driver_id === currentUser.id || t.driver_name === currentUser.name);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30">
              Driver Portal
            </span>
            <h1 className="text-2xl font-black text-white">Welcome back, {currentUser.name}!</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gemini AI is actively matching your empty return trips to high-margin nearby cargo loads.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Truck</span>
          </button>
        </div>
      </GlassCard>

      {/* Driver Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Active Registered Trucks"
          value={`${activeDriverTrucks.length} Active`}
          change="Available for Return"
          isPositive={true}
          icon={Truck}
          color="emerald"
        />
        <StatCard
          title="Driver Trust Score"
          value={`${currentUser.trust_score} / 100`}
          change="✅ Gemini AI Verified"
          isPositive={true}
          icon={ShieldCheck}
          color="purple"
        />
        <StatCard
          title="Potential Backhaul Revenue"
          value="₹48,200"
          change="Saved 420km empty"
          isPositive={true}
          icon={Sparkles}
          color="cyan"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'matches'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Return Load Matches</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'documents'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>AI Document Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'map'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Live Freight Map</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'matches' && <RecommendedLoads />}
      {activeTab === 'documents' && <DocumentUploader />}
      {activeTab === 'map' && <InteractiveMap trucks={trucks} shipments={shipments} height="520px" />}

      <RegisterTruckModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
};
