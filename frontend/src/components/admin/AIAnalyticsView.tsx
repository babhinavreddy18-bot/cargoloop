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
      <GlassCard glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">AI Return Load Match Volume & Revenue (₹k)</h3>
          </div>
          <span className="text-xs text-slate-400">Monthly Performance</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
              />
              <Area type="monotone" dataKey="matches" stroke="#10B981" fillOpacity={1} fill="url(#colorMatches)" name="AI Matches" />
              <Area type="monotone" dataKey="revenue" stroke="#06B6D4" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹k)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* CO2 Emissions Savings Bar Chart */}
      <GlassCard glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Cumulative CO₂ Emissions Saved (kg)</h3>
          </div>
          <span className="text-xs text-purple-400 font-bold">Green Freight Initiative</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
              />
              <Bar dataKey="co2" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="CO₂ Saved (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
