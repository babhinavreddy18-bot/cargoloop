import React from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: 'emerald' | 'cyan' | 'purple' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = 'emerald'
}) => {
  const colorMap = {
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200 shadow-xs',
    cyan: 'text-sky-700 bg-sky-50 border-sky-200 shadow-xs',
    purple: 'text-indigo-700 bg-indigo-50 border-indigo-200 shadow-xs',
    amber: 'text-amber-700 bg-amber-50 border-amber-200 shadow-xs',
  };

  return (
    <GlassCard hoverEffect className="flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">{value}</span>
        {change && (
          <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${
            isPositive ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200'
          }`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </GlassCard>
  );
};

