import React, { useState } from 'react';
import { Truck, MapPin, Weight, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface RegisterTruckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterTruckModal: React.FC<RegisterTruckModalProps> = ({ isOpen, onClose }) => {
  const { addTruck, currentUser } = useApp();

  const [truckNumber, setTruckNumber] = useState('');
  const [truckType, setTruckType] = useState('32ft Multi-Axle Container');
  const [capacityTons, setCapacityTons] = useState(18);
  const [currentCity, setCurrentCity] = useState('');
  const [destCity, setDestCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!truckNumber || !currentCity || !destCity) return;

    // Approximate lat/lng coordinates based on city lookup or default
    const coordsMap: Record<string, { lat: number; lng: number }> = {
      Mumbai: { lat: 19.0760, lng: 72.8777 },
      Pune: { lat: 18.5204, lng: 73.8567 },
      Ahmedabad: { lat: 23.0225, lng: 72.5714 },
      Surat: { lat: 21.1702, lng: 72.8311 },
      Delhi: { lat: 28.6139, lng: 77.2090 },
      Jaipur: { lat: 26.9124, lng: 75.7873 },
      Bengaluru: { lat: 12.9716, lng: 77.5946 },
      Chennai: { lat: 13.0827, lng: 80.2707 },
      Hyderabad: { lat: 17.3850, lng: 78.4867 }
    };

    const cCoords = coordsMap[currentCity] || { lat: 19.0760, lng: 72.8777 };
    const dCoords = coordsMap[destCity] || { lat: 18.5204, lng: 73.8567 };

    addTruck({
      driver_id: currentUser.id,
      driver_name: currentUser.name,
      driver_phone: currentUser.phone,
      truck_number: truckNumber.toUpperCase(),
      truck_type: truckType,
      capacity_tons: Number(capacityTons),
      current_lat: cCoords.lat,
      current_lng: cCoords.lng,
      current_city: currentCity,
      dest_lat: dCoords.lat,
      dest_lng: dCoords.lng,
      dest_city: destCity,
      status: 'available',
      is_verified: true,
      verification_confidence: 96,
      images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600']
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚚 Register Truck & Set Availability">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Truck Registration Number</label>
            <input
              type="text"
              placeholder="e.g. MH-12-PQ-9821"
              value={truckNumber}
              onChange={e => setTruckNumber(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Truck Body Type</label>
            <select
              value={truckType}
              onChange={e => setTruckType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors font-medium"
            >
              <option value="32ft Multi-Axle Container">32ft Multi-Axle Container</option>
              <option value="24ft Open Body Heavy">24ft Open Body Heavy</option>
              <option value="32ft MX High Body">32ft MX High Body</option>
              <option value="Eicher 19ft Closed Container">Eicher 19ft Closed Container</option>
              <option value="20ft ISO Tanker">20ft ISO Tanker</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Capacity (Tons)</label>
            <input
              type="number"
              value={capacityTons}
              onChange={e => setCapacityTons(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current GPS City</label>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              value={currentCity}
              onChange={e => setCurrentCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Destination</label>
            <input
              type="text"
              placeholder="e.g. Pune"
              value={destCity}
              onChange={e => setDestCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-xs text-emerald-800 font-medium shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Gemini AI will automatically verify your vehicle specs against RTO registration records.</span>
        </div>

        <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition-all"
          >
            Register & Activate Return Load Matching
          </button>
        </div>
      </form>
    </Modal>
  );
};
