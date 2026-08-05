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
        <span className={`inline-flex items-center font-extrabold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs ${sizeClasses[size]}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Driver</span>
        </span>
      )}

      {truckVerified && (
        <span className={`inline-flex items-center font-extrabold rounded-full bg-sky-50 text-sky-700 border border-sky-200 shadow-xs ${sizeClasses[size]}`}>
          <Truck className="w-3.5 h-3.5 text-sky-600" />
          <span>Verified Truck ({confidence}%)</span>
        </span>
      )}

      {score && (
        <span className={`inline-flex items-center font-extrabold rounded-full bg-amber-50 text-amber-700 border border-amber-200 shadow-xs ${sizeClasses[size]}`}>
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Trust Score: {score}/100</span>
        </span>
      )}
    </div>
  );
};
