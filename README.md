# 🚛 CargoLoop – AI Powered Return Load Optimization Platform

CargoLoop is a production-ready, full-stack SaaS web application designed to solve the **Truck Empty Return Problem** in freight logistics using Gemini 2.5 Flash AI and Supabase.

---

## 🎯 Objective

Develop a scalable, modern logistics platform that reduces empty truck trips, saves fuel, lowers carbon emissions, and increases driver earnings through AI-powered recommendations.

---

## 🏗️ Project Architecture & Folder Structure

```
CargoLoop/
├── frontend/                 # React + TypeScript + Tailwind CSS + Vite Web Client
│   ├── src/                  # Components, Pages, Context, Types, Mapbox/Leaflet Engine
│   ├── index.html            # Web Entrypoint
│   ├── package.json          # Frontend Dependencies & Scripts
│   ├── vite.config.ts        # Vite Bundler Configuration
│   ├── vercel.json           # Vercel SPA Routing Configuration
│   └── .env.example          # Frontend Environment Template
│
├── backend/                  # Express Node.js TypeScript API Server
│   ├── src/                  # Express App, Gemini AI Services, REST Routes
│   │   ├── server.ts         # Main Entrypoint (Port 5000)
│   │   ├── services/         # Gemini 2.5 AI Verification, Matching & Predictions
│   │   └── routes/           # REST API Endpoints (/api/ai/verify-document, etc.)
│   ├── supabase/
│   │   └── schema.sql        # Database Schema & RLS Security Policies
│   ├── package.json          # Backend Dependencies
│   └── .env.example          # Backend Environment Template
│
├── .env.example              # Master Environment Variables Template
└── README.md                 # Project Master Documentation
```

---

## 👥 User Roles & Features

### 1. 🚚 Driver Portal
- **Truck Registration**: Truck Number, Type, Capacity, Current Location, Destination, Availability.
- **Document Upload**: Driving License, RC, Insurance, PUC, Truck Images, Aadhaar.
- **AI Verification**: Gemini AI verifies authenticity, image clarity, and expiry dates with instant badges (✅ Verified Driver, ✅ Verified Truck, Trust Score).
- **AI Return Load Matching**: Matches empty return route corridors to nearby loads with match score, expected profit, fuel cost, extra distance, and CO₂ savings.

### 2. 📦 Shipper Command Hub
- **Shipment Posting**: Post cargo loads specifying pickup, drop, material, weight, truck type, loading time, contact, and price.
- **⭐ AI Future Truck Availability**: Predict trucks becoming available in advance (1h, 6h, 24h, 3d horizons) using delivery status and route corridors.
- **Advance Truck Reservations**: Reserve incoming trucks before arrival with live ETA, distance, match probability, and expected freight cost.

### 3. 🏢 Fleet Dashboard
- Real-time fleet metrics (Total Trucks, Active, Empty, Revenue, Match Rate, Fuel & CO₂ Saved).
- Gemini AI Strategic Business Insights & Recommendations.
- Future availability forecast timeline and interactive fleet telemetry map.

### 4. 🛡️ Admin Dashboard
- Manage Users, Fleet Trucks, Posted Cargo, Return Load Bookings, and Driver Documents.
- Verification queue and AI platform analytics telemetry.

---

## 🗄️ Database Schema (`backend/supabase/schema.sql`)

Supabase PostgreSQL tables:
- `users`: User profiles, roles (`driver`, `shipper`, `fleet_owner`, `admin`), trust score.
- `trucks`: Vehicle telemetry, specs, status, and verification scores.
- `shipments`: Posted cargo loads, coordinates, loading times, and offered pricing.
- `bookings`: Direct bookings and advance truck reservations.
- `driver_documents`: Document uploads and Gemini AI OCR audit logs.
- `ai_matches`: Backhaul match scoring and carbon/fuel calculations.
- `future_truck_predictions`: Predictor data across 1h, 6h, 24h, and 3d timeframes.

---

## 📡 Backend API Endpoints

- `GET  /api/health`: Health check endpoint.
- `POST /api/ai/verify-document`: Gemini AI document authentication and OCR verification.
- `POST /api/ai/match-loads`: Gemini AI return load route optimization algorithm.
- `GET  /api/ai/future-predictions`: Gemini AI future truck availability predictor.

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Express server runs on `http://localhost:5000`.

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
React Vite web client runs on `http://localhost:3000`.

---

## 🔑 Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_API_URL=http://localhost:5000
VITE_APP_ENV=development
```

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
FRONTEND_URL=http://localhost:3000
```

---

## 🌐 Deployment Instructions

### Frontend (Vercel)
1. Push repository to GitHub.
2. In Vercel, import `frontend/` as project root.
3. Select **Vite** preset and add environment variables (`VITE_GEMINI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`).
4. Deploy!

### Backend (Render)
1. Create a Web Service on Render pointing to `backend/`.
2. Build Command: `npm run build`
3. Start Command: `npm start`
4. Add environment variables (`PORT`, `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `FRONTEND_URL`).
# cargoloop2
