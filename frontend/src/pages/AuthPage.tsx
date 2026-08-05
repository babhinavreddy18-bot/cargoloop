import React, { useState } from 'react';
import { Truck, ShieldCheck, Mail, Lock, User, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const AuthPage: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const { role, setRole } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <GlassCard glow className="w-full max-w-md p-8 border-slate-200 bg-white shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20">
            <Truck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {isLogin ? 'Sign In to CargoLoop' : 'Create CargoLoop Account'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">Powered by Supabase Auth & PostgreSQL</p>
        </div>

        {/* Role Selection Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2 text-center">Select Role</label>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
            {(['driver', 'shipper', 'fleet_owner', 'admin'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 rounded-lg capitalize transition-all ${
                  role === r
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20 font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name / Company Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 transition-all"
          >
            {isLogin ? `Sign In as ${role.toUpperCase()}` : 'Create Account & Continue'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-200">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-slate-600 hover:text-emerald-700 transition-colors font-bold"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already registered? Sign In'}
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
