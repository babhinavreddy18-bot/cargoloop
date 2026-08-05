import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Truck, Shipment, FutureTruckPrediction } from '../../types';

interface InteractiveMapProps {
  trucks?: Truck[];
  shipments?: Shipment[];
  predictions?: FutureTruckPrediction[];
  onSelectShipment?: (shipment: Shipment) => void;
  onReserveTruck?: (predId: string) => void;
  height?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  trucks = [],
  shipments = [],
  predictions = [],
  onSelectShipment,
  onReserveTruck,
  height = '500px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletInstance.current) {
      // Default to center of India freight corridor (Mumbai - Pune - Delhi - Blr)
      const map = L.map(mapRef.current, {
        center: [19.0760, 74.0000],
        zoom: 6,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Light map tile layer (CartoDB Voyager / Light)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      leafletInstance.current = map;
    }

    const map = leafletInstance.current;

    // Clear previous markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // Custom SVG Icon creator
    const createTruckIcon = (color: string) => L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background-color: ${color}; width: 34px; height: 34px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px ${color}66">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const createPinIcon = (color: string) => L.divIcon({
      className: 'custom-pin-icon',
      html: `
        <div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 8px; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px ${color}66">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // 1. Add Trucks
    trucks.forEach(t => {
      const marker = L.marker([t.current_lat, t.current_lng], {
        icon: createTruckIcon(t.status === 'available' ? '#059669' : '#0284C7')
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 4px;">
          <div style="font-weight: 800; font-size: 14px; color: #059669;">${t.truck_number}</div>
          <div style="font-size: 12px; color: #334155; margin-top: 2px;">${t.truck_type} (${t.capacity_tons} Tons)</div>
          <div style="font-size: 12px; color: #64748B; margin-top: 4px;">Current: <b>${t.current_city}</b> → Dest: <b>${t.dest_city}</b></div>
          <div style="font-size: 11px; color: #059669; margin-top: 6px; font-weight: 700;">Trust Score: <b>${t.verification_confidence}%</b> Verified</div>
        </div>
      `);

      // Polyline for destination route
      if (t.dest_lat && t.dest_lng) {
        L.polyline([
          [t.current_lat, t.current_lng],
          [t.dest_lat, t.dest_lng]
        ], {
          color: '#059669',
          weight: 2,
          dashArray: '5, 10',
          opacity: 0.7
        }).addTo(map);
      }
    });

    // 2. Add Shipments
    shipments.forEach(s => {
      const pMarker = L.marker([s.pickup_lat, s.pickup_lng], {
        icon: createPinIcon('#D97706')
      }).addTo(map);

      pMarker.bindPopup(`
        <div style="padding: 4px;">
          <div style="font-weight: 800; font-size: 14px; color: #D97706;">📦 Return Load: ₹${s.offered_price.toLocaleString()}</div>
          <div style="font-size: 12px; color: #0F172A; margin-top: 2px;">${s.material} (${s.weight_tons} Tons)</div>
          <div style="font-size: 12px; color: #64748B; margin-top: 4px;">${s.pickup_city} → ${s.drop_city}</div>
        </div>
      `);

      // Route polyline for shipment
      L.polyline([
        [s.pickup_lat, s.pickup_lng],
        [s.drop_lat, s.drop_lng]
      ], {
        color: '#D97706',
        weight: 3,
        opacity: 0.8
      }).addTo(map);
    });

    // 3. Add Predictions
    predictions.forEach(p => {
      const predMarker = L.marker([p.dest_lat, p.dest_lng], {
        icon: createTruckIcon('#4F46E5')
      }).addTo(map);

      predMarker.bindPopup(`
        <div style="padding: 6px;">
          <div style="font-weight: 800; font-size: 13px; color: #4F46E5;">⚡ Future Truck Arriving in ${p.time_horizon}</div>
          <div style="font-size: 12px; color: #0F172A;">${p.truck_number} (${p.truck_type})</div>
          <div style="font-size: 11px; color: #64748B; margin-top: 4px;">Match Prob: <b>${p.match_probability}%</b> | Rem: ${p.remaining_km}km</div>
          <div style="font-size: 11px; color: #0284C7; margin-top: 2px; font-weight: 700;">Est Freight: ₹${p.expected_freight_cost.toLocaleString()}</div>
        </div>
      `);
    });

  }, [trucks, shipments, predictions]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
      <div ref={mapRef} style={{ height, width: '100%' }} className="z-10" />
      
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 flex items-center space-x-4 text-xs font-bold shadow-md">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
          <span className="text-slate-800">Active Trucks</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
          <span className="text-slate-800">Return Shipments</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          <span className="text-slate-800">Future Trucks</span>
        </div>
      </div>
    </div>
  );
};
