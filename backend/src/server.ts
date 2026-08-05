import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Root Landing Endpoint
app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <! climate-html>
    <html>
      <head>
        <title>CargoLoop AI Backend Service</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #F8FAFC; color: #0F172A; margin: 0; padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 100vh; box-sizing: border-box; }
          .card { background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; max-width: 540px; width: 100%; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
          .badge { display: inline-flex; align-items: center; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 999px; }
          h1 { margin: 16px 0 8px 0; font-size: 24px; color: #0F172A; }
          p { color: #64748B; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }
          .link-box { background: #F1F5F9; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
          .link-box a { color: #0284C7; font-weight: 700; text-decoration: none; font-size: 14px; }
          .link-box a:hover { text-decoration: underline; }
          .link-desc { font-size: 12px; color: #64748B; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">● API Server Active</div>
          <h1>🚛 CargoLoop BackHaul AI API</h1>
          <p>Express TypeScript Backend API for return load optimization & predictive truck availability.</p>

          <div class="link-box">
            <a href="http://localhost:3000" target="_blank">🌐 Open Frontend Web Application (http://localhost:3000)</a>
            <div class="link-desc">Main SaaS Portal for Drivers, Shippers, Fleet Owners & Admin</div>
          </div>

          <div class="link-box">
            <a href="/api/health">🏥 GET /api/health</a>
            <div class="link-desc">Backend service health check</div>
          </div>

          <div class="link-box">
            <a href="/api/ai/future-predictions">⚡ GET /api/ai/future-predictions</a>
            <div class="link-desc">Gemini AI Future Truck Availability Predictor Endpoint</div>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CargoLoop BackHaul AI Backend',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 CargoLoop Backend API Server running on http://localhost:${PORT}`);
});
