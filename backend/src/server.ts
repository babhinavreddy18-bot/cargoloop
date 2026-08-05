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
