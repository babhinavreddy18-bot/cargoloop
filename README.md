# 🚛 CargoLoop – Return Load Optimization SaaS Platform

CargoLoop (BackHaul AI) is a production-ready full-stack SaaS web application designed to solve the **Truck Empty Return Problem** in freight logistics using Gemini AI and Supabase.

This repository is structured into distinct **Frontend** and **Backend** directories.

---

## 📁 Project Directory Structure

```
CargoLoop/
├── frontend/                 # React + TypeScript + Tailwind CSS + Vite Web Client
│   ├── src/                  # Components, Pages, Context, Types, Leaflet Map
│   ├── index.html            # Web Entrypoint
│   ├── package.json          # Frontend Dependencies & Scripts
│   ├── vite.config.ts        # Vite Bundler Config
│   ├── vercel.json           # Vercel SPA Routing Configuration
│   └── .env                  # Local Environment Variables
│
├── backend/                  # Express Node.js TypeScript API & Supabase Service
│   ├── src/                  # Express App, Gemini AI Services, REST Routes
│   │   ├── server.ts         # Main Entrypoint (Port 5000)
│   │   ├── services/         # Gemini AI OCR, Matching & Predictions
│   │   └── routes/           # REST API Endpoints (/api/ai/verify-document, etc.)
│   ├── supabase/
│   │   └── schema.sql        # Database Schema & RLS Security Policies
│   ├── package.json          # Backend Dependencies
│   └── .env                  # Backend API Keys & Credentials
│
└── README.md                 # Project Master Documentation
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The Express Node.js API server will start on `http://localhost:5000`.

### 2. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The React Vite frontend client will start on `http://localhost:3000`.

---

## 🔑 Environment Variables Setup

### Frontend (`frontend/.env`)
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 🗄️ Database Setup (`backend/supabase/schema.sql`)
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor**.
3. Copy & paste the contents of `backend/supabase/schema.sql` and click **Run**.

---

## 🌐 Deployment Instructions

### Deploy Frontend (Vercel)
1. Push your code to GitHub.
2. In Vercel, import the `frontend/` folder as your project root.
3. Select **Vite** framework preset and add your environment variables (`VITE_GEMINI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. Deploy!

### Deploy Backend (Render / Railway / Render / Vercel Serverless)
1. In Render / Railway / Fly.io, create a Node.js web service pointing to the `backend/` directory.
2. Set Build Command: `npm run build`
3. Set Start Command: `npm start`
4. Set environment variables (`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`).
