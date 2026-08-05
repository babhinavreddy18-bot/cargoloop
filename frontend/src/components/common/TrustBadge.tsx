import React from 'react';
import { ShieldCheck, Truck, Award } from 'lucide-react';

interface TrustBadgeProps {
  score?: number;
  driverVerified?: boolean;
  truckVerified?: boolean;
  confidence?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  score = 90,
  driverVerified = true,
  truckVerified = true,
  confidence = 95,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
    lg: 'text-sm px-3 py-1.5 space-x-2'
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {driverVerified && (
        <span className={`inline-flex items-center font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${sizeClasses[size]}`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Driver</span>
        </span>
      )}

      {truckVerified && (
        <span className={`inline-flex items-center font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 ${sizeClasses[size]}`}>
          <Truck className="w-3.5 h-3.5" />
          <span>Verified Truck ({confidence}%)</span>
        </span>
      )}

      {score && (
        <span className={`inline-flex items-center font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 ${sizeClasses[size]}`}>
          <Award className="w-3.5 h-3.5" />
          <span>Trust Score: {score}/100</span>
        </span>
      )}
    </div>
  );
};
