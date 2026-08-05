import React from 'react';
import { Users, Truck, Package, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { useApp } from '../../context/AppContext';

export const AdminStats: React.FC = () => {
  const { trucks, shipments, bookings, documents } = useApp();

  const verifiedDocsCount = documents.filter(d => d.verification_status === 'verified').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Registered Users"
        value="1,420 Users"
        change="84 new this week"
        isPositive={true}
        icon={Users}
        color="cyan"
      />
      <StatCard
        title="Active Platform Trucks"
        value={`${trucks.length + 120} Trucks`}
        change="98% Verified"
        isPositive={true}
        icon={Truck}
        color="emerald"
      />
      <StatCard
        title="Active Cargo Shipments"
        value={`${shipments.length + 45} Posted`}
        change="₹1.2M Vol"
        isPositive={true}
        icon={Package}
        color="amber"
      />
      <StatCard
        title="Gemini Document Audits"
        value={`${verifiedDocsCount + 340} Audited`}
        change="99.4% Accuracy"
        isPositive={true}
        icon={ShieldCheck}
        color="purple"
      />
    </div>
  );
};
