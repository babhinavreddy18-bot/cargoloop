import React, { useState } from 'react';
import { ShieldCheck, Users, Truck, Package, Calendar, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { AdminStats } from '../components/admin/AdminStats';
import { VerificationQueue } from '../components/admin/VerificationQueue';
import { AIAnalyticsView } from '../components/admin/AIAnalyticsView';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { trucks, shipments, bookings, documents, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'trucks' | 'shipments' | 'bookings'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample users list for admin directory
  const mockUsers = [
    { id: 'usr-1', name: 'Rajesh Kumar', email: 'rajesh.driver@cargoloop.in', role: 'driver', trust_score: 96, is_verified: true },
    { id: 'usr-2', name: 'Sunil Transport Pvt Ltd', email: 'sunil@logistics.com', role: 'shipper', trust_score: 92, is_verified: true },
    { id: 'usr-3', name: 'Vanguard Express Freight', email: 'admin@vanguardfleet.com', role: 'fleet_owner', trust_score: 98, is_verified: true },
    { id: 'usr-4', name: 'Vikram Singh', email: 'vikram.d@cargoloop.in', role: 'driver', trust_score: 88, is_verified: true },
    { id: 'usr-5', name: 'Ananya Sharma', email: 'ananya@cargoloop.ai', role: 'admin', trust_score: 100, is_verified: true },
  ];

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-bold text-xs border border-rose-500/30">
              CargoLoop Governance Command
            </span>
            <h1 className="text-2xl font-black text-white">Platform Admin Control Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive platform oversight: users, verified trucks, posted shipments, bookings, and AI performance telemetry.
          </p>
        </div>
      </GlassCard>

      {/* Admin Nav Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Analytics & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts ({mockUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('trucks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'trucks'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Fleet Trucks ({trucks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('shipments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'shipments'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Posted Cargo ({shipments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Return Load Bookings ({bookings.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <AdminStats />
          <VerificationQueue />
          <AIAnalyticsView />
        </div>
      )}

      {activeTab === 'users' && (
        <GlassCard glow>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Users className="w-4 h-4 text-cyan-400 mr-2" /> Registered User Accounts
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Trust Score</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                    <td className="py-3 px-4 text-slate-400">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className="uppercase font-extrabold text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-400">{u.trust_score}/100</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Active & Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {activeTab === 'trucks' && (
        <GlassCard glow>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Truck className="w-4 h-4 text-emerald-400 mr-2" /> Registered Fleet Trucks ({trucks.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Truck Number</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Current Hub</th>
                  <th className="py-3 px-4">Target Hub</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {trucks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-bold text-emerald-400">{t.truck_number}</td>
                    <td className="py-3 px-4">{t.truck_type}</td>
                    <td className="py-3 px-4 font-semibold">{t.capacity_tons} Tons</td>
                    <td className="py-3 px-4">{t.current_city}</td>
                    <td className="py-3 px-4 text-cyan-400 font-medium">{t.dest_city}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-bold text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {t.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {activeTab === 'shipments' && (
        <GlassCard glow>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Package className="w-4 h-4 text-amber-400 mr-2" /> Posted Cargo Shipments ({shipments.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Material</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">Pickup City</th>
                  <th className="py-3 px-4">Drop City</th>
                  <th className="py-3 px-4">Offered Freight</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {shipments.map(s => (
                  <tr key={s.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-bold text-white">{s.material}</td>
                    <td className="py-3 px-4">{s.weight_tons} Tons</td>
                    <td className="py-3 px-4">{s.pickup_city}</td>
                    <td className="py-3 px-4 text-emerald-400">{s.drop_city}</td>
                    <td className="py-3 px-4 font-extrabold text-amber-400">₹{s.offered_price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-bold text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {activeTab === 'bookings' && (
        <GlassCard glow>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Calendar className="w-4 h-4 text-purple-400 mr-2" /> Return Load Bookings & Advance Reservations ({bookings.length})
            </h3>
          </div>
          {bookings.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No active bookings yet. Accept return loads or reserve future trucks to populate!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Agreed Freight</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-4 font-bold text-purple-400 font-mono">{b.id}</td>
                      <td className="py-3 px-4">
                        {b.is_advance_reservation ? (
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-extrabold text-[10px]">
                            ⭐ Advance Reservation
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px]">
                            🚚 Instant Return Load
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-emerald-400">₹{b.agreed_freight_cost.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize font-bold text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{new Date(b.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
};

