import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Sparkles, ShieldCheck, ArrowRight, Leaf, DollarSign, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { AnimatedTruck } from '../components/common/AnimatedTruck';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LandingPage: React.FC<{ onGetStarted: (role: UserRole) => void }> = ({ onGetStarted }) => {
  const { setRole } = useApp();

  const handleSelectRole = (r: UserRole) => {
    setRole(r);
    onGetStarted(r);
  };

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Solving the Truck Empty Return Problem with Gemini AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight"
        >
          Eliminate Empty Return Miles.{' '}
          <span className="text-gradient-emerald">Maximize Freight Profits.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          CargoLoop uses Gemini AI to match empty return trucks with nearby shipments in real time and predicts future truck availability for advance reservations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => handleSelectRole('driver')}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/20 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <Truck className="w-5 h-5" />
            <span>Driver: Find Return Load</span>
          </button>

          <button
            onClick={() => handleSelectRole('shipper')}
            className="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-xl shadow-sky-600/20 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5" />
            <span>Shipper: Reserve Future Truck</span>
          </button>
        </motion.div>
      </section>

      {/* Moving Truck Motion Component */}
      <AnimatedTruck />

      {/* Key Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="text-center bg-white border border-slate-200/80 shadow-xs">
          <span className="text-3xl font-black text-emerald-600 block">40%</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">Freight Cost Saved</span>
        </GlassCard>
        <GlassCard className="text-center bg-white border border-slate-200/80 shadow-xs">
          <span className="text-3xl font-black text-sky-600 block">0 km</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">Empty Return Miles</span>
        </GlassCard>
        <GlassCard className="text-center bg-white border border-slate-200/80 shadow-xs">
          <span className="text-3xl font-black text-indigo-600 block">99.4%</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">AI Verification Acc</span>
        </GlassCard>
        <GlassCard className="text-center bg-white border border-slate-200/80 shadow-xs">
          <span className="text-3xl font-black text-amber-600 block">12.4 Tons</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold">CO₂ Reduced/Mo</span>
        </GlassCard>
      </div>

      {/* Core Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Engineered for Freight Ecosystems</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Full-stack AI automation connecting Drivers, Shippers, Fleet Owners, and Platform Administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard hoverEffect onClick={() => handleSelectRole('driver')} className="space-y-3 cursor-pointer border-emerald-200 bg-white shadow-xs">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Driver Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Register trucks, upload RTO docs for AI verification, and accept high-profit return loads along target route.
            </p>
            <span className="text-xs font-extrabold text-emerald-700 flex items-center pt-2">
              Launch Driver View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>

          <GlassCard hoverEffect onClick={() => handleSelectRole('shipper')} className="space-y-3 cursor-pointer border-sky-200 bg-white shadow-xs">
            <div className="p-3 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Shipper Hub</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Post cargo loads and reserve incoming trucks in advance using Gemini AI Future Truck Availability forecasts.
            </p>
            <span className="text-xs font-extrabold text-sky-700 flex items-center pt-2">
              Launch Shipper View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>

          <GlassCard hoverEffect onClick={() => handleSelectRole('fleet_owner')} className="space-y-3 cursor-pointer border-indigo-200 bg-white shadow-xs">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 w-fit">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Fleet Dashboard</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Enterprise fleet telemetry, empty truck minimization, CO₂ savings reporting, and AI strategic business insights.
            </p>
            <span className="text-xs font-extrabold text-indigo-700 flex items-center pt-2">
              Launch Fleet View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>

          <GlassCard hoverEffect onClick={() => handleSelectRole('admin')} className="space-y-3 cursor-pointer border-amber-200 bg-white shadow-xs">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Admin Command</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Audit driver document verification logs, monitor platform match accuracy, and manage users and bookings.
            </p>
            <span className="text-xs font-extrabold text-amber-700 flex items-center pt-2">
              Launch Admin View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
