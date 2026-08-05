import React, { useState } from 'react';
import { Package, MapPin, IndianRupee, Calendar, Truck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface PostShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostShipmentModal: React.FC<PostShipmentModalProps> = ({ isOpen, onClose }) => {
  const { addShipment, currentUser } = useApp();

  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [material, setMaterial] = useState('');
  const [weightTons, setWeightTons] = useState(15);
  const [truckType, setTruckType] = useState('32ft Multi-Axle Container');
  const [contactNumber, setContactNumber] = useState(currentUser.phone || '+91 91234 56789');
  const [offeredPrice, setOfferedPrice] = useState(35000);

  const cityCoords: Record<string, { lat: number; lng: number }> = {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupCity || !dropCity || !material) return;

    const pCoords = cityCoords[pickupCity] || { lat: 19.0760, lng: 72.8777 };
    const dCoords = cityCoords[dropCity] || { lat: 18.5204, lng: 73.8567 };

    addShipment({
      shipper_id: currentUser.id,
      shipper_name: currentUser.company_name || currentUser.name,
      pickup_city: pickupCity,
      pickup_lat: pCoords.lat,
      pickup_lng: pCoords.lng,
      drop_city: dropCity,
      drop_lat: dCoords.lat,
      drop_lng: dCoords.lng,
      material: material,
      weight_tons: Number(weightTons),
      required_truck_type: truckType,
      loading_time: new Date(Date.now() + 14400000).toISOString(),
      contact_number: contactNumber,
      offered_price: Number(offeredPrice)
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📦 Post Cargo Shipment for AI Return Matching">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pickup City & Area</label>
            <input
              type="text"
              placeholder="e.g. Pune (Chakan MIDC)"
              value={pickupCity}
              onChange={e => setPickupCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dropoff City & Hub</label>
            <input
              type="text"
              placeholder="e.g. Mumbai (Bhiwandi Hub)"
              value={dropCity}
              onChange={e => setDropCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Material / Goods Type</label>
            <input
              type="text"
              placeholder="e.g. Auto Parts & Die Castings"
              value={material}
              onChange={e => setMaterial(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Cargo Weight (Tons)</label>
            <input
              type="number"
              value={weightTons}
              onChange={e => setWeightTons(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Required Truck Type</label>
            <select
              value={truckType}
              onChange={e => setTruckType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors font-medium"
            >
              <option value="32ft Multi-Axle Container">32ft Multi-Axle Container</option>
              <option value="24ft Open Body Heavy">24ft Open Body Heavy</option>
              <option value="32ft MX High Body">32ft MX High Body</option>
              <option value="Eicher 19ft Closed Container">Eicher 19ft Closed Container</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Offered Price (₹)</label>
            <input
              type="number"
              value={offeredPrice}
              onChange={e => setOfferedPrice(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors font-extrabold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
            <input
              type="text"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
              required
            />
          </div>
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
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md shadow-sky-600/20 transition-all"
          >
            Post Load & Broadcast to Return Trucks
          </button>
        </div>
      </form>
    </Modal>
  );
};
