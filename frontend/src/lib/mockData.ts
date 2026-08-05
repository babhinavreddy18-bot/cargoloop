import { UserProfile, Truck, Shipment, Booking, DriverDocument, AIMatch, FutureTruckPrediction, NotificationItem } from '../types';

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-d1',
    email: 'driver.rajesh@cargoloop.io',
    role: 'driver',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    company_name: 'Rajesh Freight Lines',
    trust_score: 96,
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString()
  },
  {
    id: 'user-s1',
    email: 'shipper.priya@logistics.in',
    role: 'shipper',
    name: 'Priya Sharma',
    phone: '+91 91234 56789',
    company_name: 'Apex Industrial Supplies',
    trust_score: 92,
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    created_at: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    id: 'user-f1',
    email: 'fleet.vikram@transports.com',
    role: 'fleet_owner',
    name: 'Vikram Singh',
    phone: '+91 99887 76655',
    company_name: 'Vanguard Fleet Systems (45 Trucks)',
    trust_score: 98,
    is_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    created_at: new Date(Date.now() - 86400000 * 90).toISOString()
  },
  {
    id: 'user-a1',
    email: 'admin@cargoloop.io',
    role: 'admin',
    name: 'CargoLoop Control Room',
    phone: '+91 80000 11111',
    company_name: 'CargoLoop Platform Admin',
    trust_score: 100,
    is_verified: true,
    created_at: new Date(Date.now() - 86400000 * 120).toISOString()
  }
];

export const MOCK_TRUCKS: Truck[] = [
  {
    id: 'trk-101',
    driver_id: 'user-d1',
    driver_name: 'Rajesh Kumar',
    driver_phone: '+91 98765 43210',
    truck_number: 'MH-12-PQ-9821',
    truck_type: '32ft Multi-Axle Container',
    capacity_tons: 18.5,
    current_lat: 19.0760,
    current_lng: 72.8777,
    current_city: 'Mumbai',
    dest_lat: 18.5204,
    dest_lng: 73.8567,
    dest_city: 'Pune',
    status: 'available',
    is_verified: true,
    verification_confidence: 98,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600'],
    created_at: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: 'trk-102',
    driver_id: 'user-d2',
    driver_name: 'Suresh Patel',
    driver_phone: '+91 98220 11223',
    truck_number: 'GJ-01-AB-4412',
    truck_type: '24ft Open Body Heavy',
    capacity_tons: 14.0,
    current_lat: 23.0225,
    current_lng: 72.5714,
    current_city: 'Ahmedabad',
    dest_lat: 19.0760,
    dest_lng: 72.8777,
    dest_city: 'Mumbai',
    status: 'available',
    is_verified: true,
    verification_confidence: 95,
    images: ['https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600'],
    created_at: new Date(Date.now() - 86400000 * 15).toISOString()
  },
  {
    id: 'trk-103',
    driver_id: 'user-d3',
    driver_name: 'Harpreet Singh',
    driver_phone: '+91 97711 33445',
    truck_number: 'PB-10-CZ-8820',
    truck_type: '32ft MX High Body',
    capacity_tons: 22.0,
    current_lat: 28.6139,
    current_lng: 77.2090,
    current_city: 'Delhi NCR',
    dest_lat: 26.9124,
    dest_lng: 75.7873,
    dest_city: 'Jaipur',
    status: 'in_transit',
    is_verified: true,
    verification_confidence: 99,
    images: ['https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600'],
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'trk-104',
    driver_id: 'user-d4',
    driver_name: 'Anil Yadav',
    driver_phone: '+91 99100 88221',
    truck_number: 'KA-04-XY-3001',
    truck_type: 'Eicher 19ft Closed Container',
    capacity_tons: 9.0,
    current_lat: 12.9716,
    current_lng: 77.5946,
    current_city: 'Bengaluru',
    dest_lat: 13.0827,
    dest_lng: 80.2707,
    dest_city: 'Chennai',
    status: 'available',
    is_verified: true,
    verification_confidence: 92,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600'],
    created_at: new Date(Date.now() - 86400000 * 8).toISOString()
  }
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'shp-501',
    shipper_id: 'user-s1',
    shipper_name: 'Apex Industrial Supplies',
    pickup_city: 'Pune (Chakan MIDC)',
    pickup_lat: 18.7600,
    pickup_lng: 73.8600,
    drop_city: 'Mumbai (Bhiwandi Hub)',
    drop_lat: 19.2812,
    drop_lng: 73.0483,
    material: 'Auto Parts & Die Castings',
    weight_tons: 16.0,
    required_truck_type: '32ft Multi-Axle Container',
    loading_time: new Date(Date.now() + 14400000).toISOString(), // in 4 hrs
    contact_number: '+91 91234 56789',
    offered_price: 34000,
    status: 'open',
    created_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'shp-502',
    shipper_id: 'user-s2',
    shipper_name: 'Reliance Polymers Depot',
    pickup_city: 'Vapi Industrial Estate',
    pickup_lat: 20.3718,
    pickup_lng: 72.9044,
    drop_city: 'Ahmedabad (Sanand)',
    drop_lat: 23.0000,
    drop_lng: 72.3800,
    material: 'Plastic Granules & Raw Material',
    weight_tons: 12.5,
    required_truck_type: '24ft Open Body Heavy',
    loading_time: new Date(Date.now() + 28800000).toISOString(),
    contact_number: '+91 98990 00112',
    offered_price: 28500,
    status: 'open',
    created_at: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: 'shp-503',
    shipper_id: 'user-s3',
    shipper_name: 'Jaipur Crafts Exports',
    pickup_city: 'Jaipur (Sitapura)',
    pickup_lat: 26.7770,
    pickup_lng: 75.8450,
    drop_city: 'Delhi (ICD Tughlakabad)',
    drop_lat: 28.5080,
    drop_lng: 77.2600,
    material: 'Handicrafts & Wooden Furniture',
    weight_tons: 19.5,
    required_truck_type: '32ft MX High Body',
    loading_time: new Date(Date.now() + 43200000).toISOString(),
    contact_number: '+91 94140 22334',
    offered_price: 42000,
    status: 'open',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'shp-504',
    shipper_id: 'user-s1',
    shipper_name: 'Apex Industrial Supplies',
    pickup_city: 'Hosur Industrial Hub',
    pickup_lat: 12.7409,
    pickup_lng: 77.8253,
    drop_city: 'Bengaluru (Peenya)',
    drop_lat: 13.0285,
    drop_lng: 77.5197,
    material: 'Electrical Transformers & Cables',
    weight_tons: 8.5,
    required_truck_type: 'Eicher 19ft Closed Container',
    loading_time: new Date(Date.now() + 18000000).toISOString(),
    contact_number: '+91 91234 56789',
    offered_price: 18000,
    status: 'open',
    created_at: new Date(Date.now() - 5400000).toISOString()
  }
];

export const MOCK_FUTURE_PREDICTIONS: FutureTruckPrediction[] = [
  {
    id: 'pred-1',
    truck_id: 'trk-101',
    truck_number: 'MH-12-PQ-9821',
    truck_type: '32ft Multi-Axle Container',
    driver_name: 'Rajesh Kumar',
    trust_score: 96,
    is_verified: true,
    current_location_city: 'Navi Mumbai',
    target_destination_city: 'Pune MIDC',
    predicted_available_at: new Date(Date.now() + 3600000 * 1.5).toISOString(), // 1.5 hours from now
    time_horizon: '1h',
    match_probability: 97,
    remaining_km: 42,
    current_delivery_status: 'Unloading cargo at JNPT Terminal B',
    expected_freight_cost: 32500,
    dest_lat: 18.5204,
    dest_lng: 73.8567
  },
  {
    id: 'pred-2',
    truck_id: 'trk-103',
    truck_number: 'PB-10-CZ-8820',
    truck_type: '32ft MX High Body',
    driver_name: 'Harpreet Singh',
    trust_score: 99,
    is_verified: true,
    current_location_city: 'Gurugram NH-48',
    target_destination_city: 'Jaipur VKIA',
    predicted_available_at: new Date(Date.now() + 3600000 * 5.2).toISOString(), // 5.2 hours from now
    time_horizon: '6h',
    match_probability: 94,
    remaining_km: 185,
    current_delivery_status: 'In Transit on Express Tollway',
    expected_freight_cost: 41000,
    dest_lat: 26.9124,
    dest_lng: 75.7873
  },
  {
    id: 'pred-3',
    truck_id: 'trk-102',
    truck_number: 'GJ-01-AB-4412',
    truck_type: '24ft Open Body Heavy',
    driver_name: 'Suresh Patel',
    trust_score: 95,
    is_verified: true,
    current_location_city: 'Surat Bypass',
    target_destination_city: 'Bhiwandi Logistics Park',
    predicted_available_at: new Date(Date.now() + 3600000 * 18.5).toISOString(), // ~18 hours
    time_horizon: '24h',
    match_probability: 89,
    remaining_km: 260,
    current_delivery_status: 'Scheduled rest stop at Vapi border',
    expected_freight_cost: 27000,
    dest_lat: 19.2812,
    dest_lng: 73.0483
  },
  {
    id: 'pred-4',
    truck_id: 'trk-104',
    truck_number: 'KA-04-XY-3001',
    truck_type: 'Eicher 19ft Closed Container',
    driver_name: 'Anil Yadav',
    trust_score: 92,
    is_verified: true,
    current_location_city: 'Sriperumbudur',
    target_destination_city: 'Bengaluru Whitefield',
    predicted_available_at: new Date(Date.now() + 3600000 * 48).toISOString(), // 2 days
    time_horizon: '3d',
    match_probability: 91,
    remaining_km: 310,
    current_delivery_status: 'Loading inbound electronic components',
    expected_freight_cost: 19500,
    dest_lat: 12.9716,
    dest_lng: 77.5946
  }
];

export const MOCK_AI_MATCHES: AIMatch[] = [
  {
    id: 'match-1',
    truck_id: 'trk-101',
    shipment_id: 'shp-501',
    match_score: 98,
    expected_profit: 14200,
    fuel_cost: 4800,
    extra_distance_km: 18,
    eta_hours: 2.5,
    carbon_savings_kg: 340,
    ai_recommendation_reason: 'Truck MH-12-PQ-9821 unloads 12km from Chakan MIDC pickup point. Zero deadhead return miles; optimizes capacity utilization to 88%.'
  },
  {
    id: 'match-2',
    truck_id: 'trk-102',
    shipment_id: 'shp-502',
    match_score: 92,
    expected_profit: 11500,
    fuel_cost: 5200,
    extra_distance_km: 24,
    eta_hours: 4.0,
    carbon_savings_kg: 280,
    ai_recommendation_reason: 'Perfect open body match along Surat-Ahmedabad freight corridor. Reduces fuel expenditure by 42% compared to empty return trip.'
  }
];

export const MOCK_DRIVER_DOCUMENTS: DriverDocument[] = [
  {
    id: 'doc-1',
    driver_id: 'user-d1',
    document_type: 'license',
    document_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
    expiry_date: '2028-11-20',
    verification_status: 'verified',
    confidence_score: 99,
    ai_verification_summary: {
      is_authentic: true,
      image_clear: true,
      expiry_valid: true,
      extracted_text: 'DL No: MH-12-2018-0099411 | Name: Rajesh Kumar | Class: HGMV Heavy Trans',
      trust_delta: 25,
      notes: 'Authentic Indian RTO Commercial Driving License issued by MH-12. Valid till Nov 2028.'
    },
    uploaded_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'doc-2',
    driver_id: 'user-d1',
    document_type: 'rc',
    document_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
    expiry_date: '2030-04-15',
    verification_status: 'verified',
    confidence_score: 97,
    ai_verification_summary: {
      is_authentic: true,
      image_clear: true,
      expiry_valid: true,
      extracted_text: 'Reg No: MH-12-PQ-9821 | Chassis: MAT402011K9982 | Gross Wt: 28000kg',
      trust_delta: 25,
      notes: 'Registration Certificate verified against Parivahan database standard.'
    },
    uploaded_at: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '⭐ High Confidence Return Match',
    message: 'Gemini AI found a 98% match for MH-12-PQ-9821: Auto Parts load from Chakan (₹34,000).',
    timestamp: '10 mins ago',
    type: 'match',
    read: false
  },
  {
    id: 'notif-2',
    title: '⚡ Advance Reservation Received',
    message: 'Apex Industrial Supplies reserved your truck for arrival in Pune in 1.5 hours.',
    timestamp: '25 mins ago',
    type: 'booking',
    read: false
  },
  {
    id: 'notif-3',
    title: '✅ Driver Verified by Gemini AI',
    message: 'Rajesh Kumar document verification complete. Trust Score upgraded to 96.',
    timestamp: '1 hour ago',
    type: 'verification',
    read: true
  }
];
