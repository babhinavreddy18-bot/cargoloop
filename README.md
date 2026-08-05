# 🚛 CargoLoop – AI-Powered Return Load Optimization SaaS Platform

CargoLoop (BackHaul AI) is a production-ready full-stack SaaS web application designed to solve the **Truck Empty Return Problem** in freight logistics. 

By leveraging **Gemini AI**, CargoLoop automatically matches empty trucks with nearby return loads, predicts future truck availability for advance reservations, and conducts instant AI document verification for drivers and fleet owners.

---

## ⚡ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling & Motion**: Tailwind CSS, Framer Motion, Custom Glassmorphism UI
- **Routing & Forms**: React Router DOM v7, React Hook Form
- **Mapping & Geolocation**: Leaflet & OpenStreetMap tiles with animated truck SVG overlays
- **Database & Auth**: Supabase (PostgreSQL, Auth, Realtime)
- **Artificial Intelligence**: Google Gemini 2.5 Flash API (`@google/generative-ai`)
- **Data Visualization**: Recharts

---

## 👥 User Roles

1. **Driver**:
   - Register trucks (Type, Capacity, GPS Location, Destination, Availability)
   - Upload driver & vehicle documents (License, RC, Insurance, PUC, Truck Photo, Aadhaar)
   - Real-time Gemini AI document authenticity verification & Trust Score calculation
   - View recommended return loads with profit & CO₂ savings breakdown

2. **Shipper**:
   - Post cargo shipments (Pickup, Drop, Cargo Material, Weight, Price, Loading Time)
   - **⭐ AI Future Truck Availability**: View predicted incoming trucks and reserve trucks in advance before arrival
   - View live match probabilities, driver verification badges, and estimated arrival times

3. **Fleet Owner**:
   - Enterprise fleet metrics (Total Trucks, Active vs Empty Trucks, Revenue, Match Rate, Fuel & CO₂ Saved)
   - Gemini AI Strategic Business Insights
   - Future truck availability timeline (1h, 6h, 24h, 3d horizons)

4. **Admin**:
   - Governance dashboard for managing users, trucks, shipments, and bookings
   - Automated driver document verification audit queue
   - Recharts visual analytics on match volumes, revenue, and cumulative carbon reduction

---

## 🗄️ Database Schema (`supabase/schema.sql`)

The database consists of 7 normalized PostgreSQL tables:
- `users`: User profiles, roles, trust scores, and verification status.
- `trucks`: Vehicle specs, capacity, live GPS coordinates, and availability status.
- `shipments`: Cargo postings with pickup/drop locations, cargo weight, and offered price.
- `bookings`: Agreed freight bookings, advance reservations, and ETA tracking.
- `driver_documents`: Document uploads with Gemini AI verification results & confidence scores.
- `ai_matches`: Match scores, profit margins, fuel costs, extra detour distances, and carbon savings.
- `future_truck_predictions`: Predicted incoming trucks, time horizons, match probabilities, and remaining km.

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Clone repository
git clone https://github.com/your-username/CargoLoop.git
cd CargoLoop

# Install dependencies
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your Gemini API key and Supabase credentials:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```
*(Note: CargoLoop features built-in high-fidelity AI and database simulation fallback modes out-of-the-box if keys are omitted).*

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment on Vercel

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set Framework Preset to **Vite**.
4. Configure Environment Variables (`VITE_GEMINI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
5. Click **Deploy**.

---

## 📄 License
MIT License. Built for CargoLoop.
# cargoloop
