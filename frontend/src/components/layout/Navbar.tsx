import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Truck, Bell, Sparkles, User, ShieldCheck, Map, Plus, LayoutDashboard, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { RegisterTruckModal } from '../driver/RegisterTruckModal';
import { PostShipmentModal } from '../shipper/PostShipmentModal';

export const Navbar: React.FC<{ onNavigateToDashboard?: () => void }> = ({ onNavigateToDashboard }) => {
  const { role, setRole, currentUser, notifications } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isTruckModalOpen, setIsTruckModalOpen] = useState(false);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles: { id: UserRole; label: string }[] = [
    { id: 'driver', label: '🚚 Driver' },
    { id: 'shipper', label: '📦 Shipper' },
    { id: 'fleet_owner', label: '🏢 Fleet Owner' },
    { id: 'admin', label: '🛡️ Admin' }
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 shadow-xs">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                Cargo<span className="text-gradient-emerald">Loop</span>
                <span className="ml-2 px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-widest">
                  BackHaul AI
                </span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-0.5 font-medium">Return Load Optimization Platform</span>
            </div>
          </Link>

          {/* Navigation Links & Role Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200 text-xs">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1 transition-all ${
                  location.pathname === '/' ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1 transition-all ${
                  location.pathname === '/dashboard' ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/map"
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1 transition-all ${
                  location.pathname === '/map' ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Map</span>
              </Link>
            </div>

            {/* Role Pills */}
            <div className="flex items-center space-x-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleRoleSelect(r.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    role === r.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Action Button depending on Role */}
            {role === 'driver' && (
              <button
                onClick={() => setIsTruckModalOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Register Truck</span>
              </button>
            )}

            {role === 'shipper' && (
              <button
                onClick={() => setIsShipmentModalOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Post Shipment</span>
              </button>
            )}

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border border-emerald-500/60 object-cover shadow-xs"
              />
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-700 font-semibold block flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" /> Trust {currentUser.trust_score}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawers & Modals */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <RegisterTruckModal isOpen={isTruckModalOpen} onClose={() => setIsTruckModalOpen(false)} />
      <PostShipmentModal isOpen={isShipmentModalOpen} onClose={() => setIsShipmentModalOpen(false)} />
    </>
  );
};
