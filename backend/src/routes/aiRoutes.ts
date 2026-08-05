import { Router, Request, Response } from 'express';
import { verifyDriverDocument, matchReturnLoads } from '../services/geminiService.js';

const router = Router();

// 1. AI Document & Truck Image Verification Endpoint
router.post('/verify-document', async (req: Request, res: Response) => {
  try {
    const { docType, docName, base64Image } = req.body;
    if (!docType || !docName) {
      return res.status(400).json({ error: 'docType and docName are required.' });
    }

    const result = await verifyDriverDocument(docType, docName, base64Image);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to perform AI verification.', details: error?.message });
  }
});

// 2. AI Return Load Matching Endpoint
router.post('/match-loads', async (req: Request, res: Response) => {
  try {
    const { truck, availableShipments } = req.body;
    if (!truck || !availableShipments) {
      return res.status(400).json({ error: 'truck and availableShipments payload required.' });
    }

    const matches = await matchReturnLoads(truck, availableShipments);
    return res.json(matches);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to run AI load matching.', details: error?.message });
  }
});

export default router;
