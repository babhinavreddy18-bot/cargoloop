export type UserRole = 'driver' | 'shipper' | 'fleet_owner' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone: string;
  company_name?: string;
  trust_score: number;
  is_verified: boolean;
  avatar_url?: string;
  created_at: string;
}

export type TruckStatus = 'available' | 'in_transit' | 'completed' | 'offline';

export interface Truck {
  id: string;
  driver_id: string;
  driver_name?: string;
  driver_phone?: string;
  truck_number: string;
  truck_type: string; // 32ft Multi-Axle, Container, Trailer, Eicher 14ft
  capacity_tons: number;
  current_lat: number;
  current_lng: number;
  current_city: string;
  dest_lat: number;
  dest_lng: number;
  dest_city: string;
  status: TruckStatus;
  is_verified: boolean;
  verification_confidence: number;
  images?: string[];
  created_at: string;
}

export type ShipmentStatus = 'open' | 'reserved' | 'in_transit' | 'completed' | 'cancelled';

export interface Shipment {
  id: string;
  shipper_id: string;
  shipper_name?: string;
  pickup_city: string;
  pickup_lat: number;
  pickup_lng: number;
  drop_city: string;
  drop_lat: number;
  drop_lng: number;
  material: string;
  weight_tons: number;
  required_truck_type: string;
  loading_time: string;
  contact_number: string;
  offered_price: number;
  status: ShipmentStatus;
  created_at: string;
}

export interface Booking {
  id: string;
  shipment_id: string;
  truck_id: string;
  driver_id: string;
  shipper_id: string;
  agreed_freight_cost: number;
  is_advance_reservation: boolean;
  predicted_eta?: string;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  created_at: string;
  shipment?: Shipment;
  truck?: Truck;
}

export type DocumentType = 'license' | 'rc' | 'insurance' | 'puc' | 'truck_image' | 'aadhaar';

export interface DriverDocument {
  id: string;
  driver_id: string;
  document_type: DocumentType;
  document_url: string;
  expiry_date?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  confidence_score: number;
  ai_verification_summary?: {
    is_authentic: boolean;
    image_clear: boolean;
    expiry_valid: boolean;
    extracted_text?: string;
    trust_delta: number;
    notes: string;
  };
  uploaded_at: string;
}

export interface AIMatch {
  id: string;
  truck_id: string;
  shipment_id: string;
  match_score: number; // 0 - 100%
  expected_profit: number;
  fuel_cost: number;
  extra_distance_km: number;
  eta_hours: number;
  carbon_savings_kg: number;
  ai_recommendation_reason: string;
  shipment?: Shipment;
  truck?: Truck;
}

export interface FutureTruckPrediction {
  id: string;
  truck_id: string;
  truck_number: string;
  truck_type: string;
  driver_name: string;
  trust_score: number;
  is_verified: boolean;
  current_location_city: string;
  target_destination_city: string;
  predicted_available_at: string; // ISO string
  time_horizon: '1h' | '6h' | '24h' | '3d';
  match_probability: number; // 0 - 100%
  remaining_km: number;
  current_delivery_status: string;
  expected_freight_cost: number;
  dest_lat: number;
  dest_lng: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'match' | 'booking' | 'verification' | 'system';
  read: boolean;
}
