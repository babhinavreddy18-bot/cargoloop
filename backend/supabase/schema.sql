-- CargoLoop (BackHaul AI) Supabase PostgreSQL Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('driver', 'shipper', 'fleet_owner', 'admin')),
  name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  trust_score INT DEFAULT 85,
  is_verified BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TRUCKS TABLE
CREATE TABLE IF NOT EXISTS public.trucks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  truck_number TEXT UNIQUE NOT NULL,
  truck_type TEXT NOT NULL, -- e.g. 32ft Multi-Axle, Container, Trailer, Eicher 14ft
  capacity_tons NUMERIC(5,2) NOT NULL,
  current_lat NUMERIC(9,6) NOT NULL,
  current_lng NUMERIC(9,6) NOT NULL,
  current_city TEXT NOT NULL,
  dest_lat NUMERIC(9,6) NOT NULL,
  dest_lng NUMERIC(9,6) NOT NULL,
  dest_city TEXT NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'in_transit', 'completed', 'offline')),
  is_verified BOOLEAN DEFAULT false,
  verification_confidence INT DEFAULT 0,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SHIPMENTS TABLE
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipper_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  pickup_city TEXT NOT NULL,
  pickup_lat NUMERIC(9,6) NOT NULL,
  pickup_lng NUMERIC(9,6) NOT NULL,
  drop_city TEXT NOT NULL,
  drop_lat NUMERIC(9,6) NOT NULL,
  drop_lng NUMERIC(9,6) NOT NULL,
  material TEXT NOT NULL,
  weight_tons NUMERIC(5,2) NOT NULL,
  required_truck_type TEXT NOT NULL,
  loading_time TIMESTAMP WITH TIME ZONE NOT NULL,
  contact_number TEXT NOT NULL,
  offered_price NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'reserved', 'in_transit', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  truck_id UUID REFERENCES public.trucks(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.users(id),
  shipper_id UUID REFERENCES public.users(id),
  agreed_freight_cost NUMERIC(10,2) NOT NULL,
  is_advance_reservation BOOLEAN DEFAULT false,
  predicted_eta TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. DRIVER DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.driver_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('license', 'rc', 'insurance', 'puc', 'truck_image', 'aadhaar')),
  document_url TEXT NOT NULL,
  expiry_date DATE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  confidence_score INT DEFAULT 0,
  ai_verification_summary JSONB,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. AI MATCHES TABLE
CREATE TABLE IF NOT EXISTS public.ai_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  truck_id UUID REFERENCES public.trucks(id) ON DELETE CASCADE,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  match_score INT NOT NULL, -- 0-100%
  expected_profit NUMERIC(10,2) NOT NULL,
  fuel_cost NUMERIC(10,2) NOT NULL,
  extra_distance_km NUMERIC(6,2) NOT NULL,
  eta_hours NUMERIC(4,1) NOT NULL,
  carbon_savings_kg NUMERIC(6,2) NOT NULL,
  ai_recommendation_reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. FUTURE TRUCK PREDICTIONS TABLE
CREATE TABLE IF NOT EXISTS public.future_truck_predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  truck_id UUID REFERENCES public.trucks(id) ON DELETE CASCADE,
  current_location_city TEXT NOT NULL,
  target_destination_city TEXT NOT NULL,
  predicted_available_at TIMESTAMP WITH TIME ZONE NOT NULL,
  time_horizon TEXT NOT NULL CHECK (time_horizon IN ('1h', '6h', '24h', '3d')),
  match_probability INT NOT NULL, -- 0-100%
  remaining_km NUMERIC(6,2) NOT NULL,
  current_delivery_status TEXT NOT NULL,
  expected_freight_cost NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS POLICIES (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.future_truck_predictions ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Public Read Access" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public Read Trucks" ON public.trucks FOR SELECT USING (true);
CREATE POLICY "Public Read Shipments" ON public.shipments FOR SELECT USING (true);
CREATE POLICY "Public Read Bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public Read Documents" ON public.driver_documents FOR SELECT USING (true);
CREATE POLICY "Public Read Matches" ON public.ai_matches FOR SELECT USING (true);
CREATE POLICY "Public Read Predictions" ON public.future_truck_predictions FOR SELECT USING (true);

-- Allow full write for demo
CREATE POLICY "Allow All Insert Trucks" ON public.trucks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Insert Shipments" ON public.shipments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Insert Documents" ON public.driver_documents FOR INSERT WITH CHECK (true);
