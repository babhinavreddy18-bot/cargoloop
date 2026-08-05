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
      <GlassCard glow className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-slate-200 shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 font-extrabold text-xs border border-rose-200">
              CargoLoop Governance Command
            </span>
            <h1 className="text-2xl font-black text-slate-900">Platform Admin Control Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Comprehensive platform oversight: users, verified trucks, posted shipments, bookings, and AI performance telemetry.
          </p>
        </div>
      </GlassCard>

      {/* Admin Nav Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-rose-600" />
          <span>AI Analytics & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-sky-600" />
          <span>User Accounts ({mockUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('trucks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'trucks'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>Fleet Trucks ({trucks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('shipments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'shipments'
              ? 'bg-amber-50 text-amber-800 border border-amber-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4 text-amber-600" />
          <span>Posted Cargo ({shipments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-indigo-600" />
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
        <GlassCard glow className="bg-white border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center">
              <Users className="w-4 h-4 text-sky-600 mr-2" /> Registered User Accounts
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Trust Score</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3 px-4 text-slate-500">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className="uppercase font-extrabold text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">{u.trust_score}/100</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Active & Verified
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
        <GlassCard glow className="bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center">
              <Truck className="w-4 h-4 text-emerald-600 mr-2" /> Registered Fleet Trucks ({trucks.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                  <th className="py-3 px-4">Truck Number</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Current Hub</th>
                  <th className="py-3 px-4">Target Hub</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {trucks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-emerald-700">{t.truck_number}</td>
                    <td className="py-3 px-4">{t.truck_type}</td>
                    <td className="py-3 px-4 font-semibold">{t.capacity_tons} Tons</td>
                    <td className="py-3 px-4">{t.current_city}</td>
                    <td className="py-3 px-4 text-sky-700 font-bold">{t.dest_city}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-bold text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
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
        <GlassCard glow className="bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center">
              <Package className="w-4 h-4 text-amber-600 mr-2" /> Posted Cargo Shipments ({shipments.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                  <th className="py-3 px-4">Material</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">Pickup City</th>
                  <th className="py-3 px-4">Drop City</th>
                  <th className="py-3 px-4">Offered Freight</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {shipments.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{s.material}</td>
                    <td className="py-3 px-4">{s.weight_tons} Tons</td>
                    <td className="py-3 px-4">{s.pickup_city}</td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">{s.drop_city}</td>
                    <td className="py-3 px-4 font-extrabold text-amber-700">₹{s.offered_price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-bold text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
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
        <GlassCard glow className="bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center">
              <Calendar className="w-4 h-4 text-indigo-600 mr-2" /> Return Load Bookings & Advance Reservations ({bookings.length})
            </h3>
          </div>
          {bookings.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center font-medium">No active bookings yet. Accept return loads or reserve future trucks to populate!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Agreed Freight</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-indigo-700 font-mono">{b.id}</td>
                      <td className="py-3 px-4">
                        {b.is_advance_reservation ? (
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-extrabold text-[10px]">
                            ⭐ Advance Reservation
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-[10px]">
                            🚚 Instant Return Load
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-emerald-700">₹{b.agreed_freight_cost.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize font-bold text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{new Date(b.created_at).toLocaleDateString()}</td>
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

