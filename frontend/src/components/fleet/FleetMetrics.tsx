import React from 'react';
import { Truck, CheckCircle2, TrendingUp, IndianRupee, Fuel, Leaf, Percent } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { useApp } from '../../context/AppContext';

export const FleetMetrics: React.FC = () => {
  const { trucks, bookings } = useApp();

  const totalTrucks = 45; // Fleet of 45 trucks
  const activeTrucks = trucks.filter(t => t.status === 'in_transit').length + 28;
  const emptyTrucks = totalTrucks - activeTrucks;
  
  const totalRevenue = 428000 + bookings.reduce((sum, b) => sum + b.agreed_freight_cost, 0);
  const matchRate = 94.2;
  const fuelSavedLiters = 3420;
  const co2SavedKg = 8950;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Fleet Size"
        value={`${totalTrucks} Trucks`}
        change="3 new added"
        isPositive={true}
        icon={Truck}
        color="cyan"
      />
      <StatCard
        title="Active vs Empty Trucks"
        value={`${activeTrucks} / ${emptyTrucks}`}
        change={`${((activeTrucks / totalTrucks) * 100).toFixed(0)}% Utilization`}
        isPositive={true}
        icon={CheckCircle2}
        color="emerald"
      />
      <StatCard
        title="Fleet Monthly Revenue"
        value={`₹${(totalRevenue / 1000).toFixed(1)}k`}
        change="18.4% vs last mo"
        isPositive={true}
        icon={IndianRupee}
        color="amber"
      />
      <StatCard
        title="Empty Return Elimination"
        value={`${matchRate}% Match`}
        change={`${co2SavedKg}kg CO₂ Saved`}
        isPositive={true}
        icon={Leaf}
        color="purple"
      />
    </div>
  );
};
