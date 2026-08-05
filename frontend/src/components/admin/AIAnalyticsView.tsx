import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sparkles, Activity, Leaf } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const AIAnalyticsView: React.FC = () => {
  const chartData = [
    { month: 'Jan', matches: 320, co2: 4500, revenue: 180 },
    { month: 'Feb', matches: 450, co2: 6200, revenue: 240 },
    { month: 'Mar', matches: 610, co2: 8400, revenue: 320 },
    { month: 'Apr', matches: 840, co2: 11200, revenue: 450 },
    { month: 'May', matches: 1120, co2: 15400, revenue: 590 },
    { month: 'Jun', matches: 1480, co2: 20100, revenue: 780 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Return Load Matches & Revenue Growth */}
      <GlassCard glow className="bg-white border-slate-200 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-slate-900">AI Return Load Match Volume & Revenue (₹k)</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">Monthly Performance</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.8} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.75rem', color: '#0F172A', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="matches" stroke="#059669" fillOpacity={1} fill="url(#colorMatches)" name="AI Matches" />
              <Area type="monotone" dataKey="revenue" stroke="#0284C7" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹k)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* CO2 Emissions Savings Bar Chart */}
      <GlassCard glow className="bg-white border-slate-200 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-extrabold text-slate-900">Cumulative CO₂ Emissions Saved (kg)</h3>
          </div>
          <span className="text-xs text-indigo-700 font-extrabold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">Green Freight Initiative</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.8} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.75rem', color: '#0F172A', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="co2" fill="#4F46E5" radius={[6, 6, 0, 0]} name="CO₂ Saved (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
