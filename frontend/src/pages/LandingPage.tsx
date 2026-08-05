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
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
        >
          <Sparkles className="w-4 h-4" />
          <span>Solving the Truck Empty Return Problem with Gemini AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight"
        >
          Eliminate Empty Return Miles.{' '}
          <span className="text-gradient-emerald">Maximize Freight Profits.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
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
            className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <Truck className="w-5 h-5" />
            <span>Driver: Find Return Load</span>
          </button>

          <button
            onClick={() => handleSelectRole('shipper')}
            className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
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
        <GlassCard className="text-center">
          <span className="text-3xl font-extrabold text-emerald-400 block">40%</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Freight Cost Saved</span>
        </GlassCard>
        <GlassCard className="text-center">
          <span className="text-3xl font-extrabold text-cyan-400 block">0 km</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Empty Return Miles</span>
        </GlassCard>
        <GlassCard className="text-center">
          <span className="text-3xl font-extrabold text-purple-400 block">99.4%</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">AI Verification Acc</span>
        </GlassCard>
        <GlassCard className="text-center">
          <span className="text-3xl font-extrabold text-amber-400 block">12.4 Tons</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">CO₂ Reduced/Mo</span>
        </GlassCard>
      </div>

      {/* Core Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Engineered for Freight Ecosystems</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Full-stack AI automation connecting Drivers, Shippers, Fleet Owners, and Platform Administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard hoverEffect onClick={() => handleSelectRole('driver')} className="space-y-3 cursor-pointer border-emerald-500/30">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Driver Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register trucks, upload RTO docs for AI verification, and accept high-profit return loads along target route.
            </p>
            <span className="text-xs font-bold text-emerald-400 flex items-center pt-2">
              Launch Driver View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>

          <GlassCard hoverEffect onClick={() => handleSelectRole('shipper')} className="space-y-3 cursor-pointer border-cyan-500/30">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Shipper Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Post cargo loads and reserve incoming trucks in advance using Gemini AI Future Truck Availability forecasts.
            </p>
            <span className="text-xs font-bold text-cyan-400 flex items-center pt-2">
              Launch Shipper View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>

          <GlassCard hoverEffect onClick={() => handleSelectRole('fleet_owner')} className="space-y-3 cursor-pointer border-purple-500/30">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 w-fit">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Fleet Dashboard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise fleet telemetry, empty truck minimization, CO₂ savings reporting, and AI strategic business insights.
            </p>
            <span className="text-xs font-bold text-purple-400 flex items-center pt-2">
              Launch Fleet View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>

          <GlassCard hoverEffect onClick={() => handleSelectRole('admin')} className="space-y-3 cursor-pointer border-amber-500/30">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Admin Command</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Audit driver document verification logs, monitor platform match accuracy, and manage users and bookings.
            </p>
            <span className="text-xs font-bold text-amber-400 flex items-center pt-2">
              Launch Admin View <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
