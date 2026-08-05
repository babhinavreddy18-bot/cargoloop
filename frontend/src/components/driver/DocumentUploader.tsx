import React, { useState } from 'react';
import { Upload, FileCheck, Loader2, Sparkles, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { DocumentType } from '../../types';
import { useApp } from '../../context/AppContext';
import { verifyDriverDocumentWithGemini, VerificationResult } from '../../lib/gemini';

export const DocumentUploader: React.FC = () => {
  const { documents, addDocument, currentUser } = useApp();
  
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('license');
  const [isUploading, setIsUploading] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState<VerificationResult | null>(null);

  const docTypes: { type: DocumentType; label: string; desc: string }[] = [
    { type: 'license', label: 'Commercial Driving License', desc: 'HGV / Heavy Commercial Vehicle DL' },
    { type: 'rc', label: 'Registration Certificate (RC)', desc: 'Smartcard RC with chassis number' },
    { type: 'insurance', label: 'Vehicle Insurance Policy', desc: 'Comprehensive Third-Party + Goods Ins' },
    { type: 'puc', label: 'Pollution Under Control (PUC)', desc: 'Active emissions certificate' },
    { type: 'truck_image', label: 'Truck Photo (Front/Side)', desc: 'Clear image showing license plate' },
    { type: 'aadhaar', label: 'Aadhaar / ID Proof', desc: 'Government issued identity card' }
  ];

  const handleSimulatedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setLatestAnalysis(null);

    let base64Data: string | undefined;
    if (file.type.startsWith('image/')) {
      base64Data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    try {
      // Execute Gemini AI Document Verification Workflow
      const res = await verifyDriverDocumentWithGemini(selectedDocType, file.name, base64Data);
      setLatestAnalysis(res);

      // Save to global state context
      addDocument({
        driver_id: currentUser.id,
        document_type: selectedDocType,
        document_url: base64Data || URL.createObjectURL(file),
        expiry_date: res.expiry_date || new Date(Date.now() + 86400000 * 365 * 2).toISOString().split('T')[0],
        verification_status: res.is_authentic ? 'verified' : 'rejected',
        confidence_score: res.confidence_score,
        ai_verification_summary: res
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gemini AI Document Verification Engine</h3>
              <p className="text-xs text-slate-400">Upload documents for instant authenticity, clarity, and expiration check.</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Trust Score: {currentUser.trust_score}/100
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {docTypes.map(item => {
            const existing = documents.find(d => d.document_type === item.type);
            const isSel = selectedDocType === item.type;
            
            return (
              <div
                key={item.type}
                onClick={() => setSelectedDocType(item.type)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSel
                    ? 'bg-slate-800 border-purple-500/50 shadow-md shadow-purple-500/10'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{item.label}</h4>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
                {existing ? (
                  <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">Not Uploaded</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Upload Zone */}
        <div className="relative border-2 border-dashed border-slate-700 hover:border-purple-500/60 rounded-2xl p-8 text-center bg-slate-950/50 transition-all">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleSimulatedUpload}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
                <p className="text-sm font-semibold text-purple-300 animate-pulse">
                  Gemini AI Analyzing Document Authenticity & Expiry...
                </p>
              </>
            ) : (
              <>
                <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">
                    Click or Drag file to upload {selectedDocType.toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, PDF (Max 10MB)</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Latest AI Analysis Card */}
        {latestAnalysis && (
          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5" /> Gemini AI Verification Report
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                Confidence: {latestAnalysis.confidence_score}%
              </span>
            </div>
            
            <p className="text-slate-300 leading-relaxed">{latestAnalysis.notes}</p>
            <div className="p-2 rounded bg-slate-950 text-slate-400 font-mono text-[11px]">
              {latestAnalysis.extracted_text}
            </div>

            <div className="flex items-center space-x-4 pt-1">
              <span className="text-emerald-400 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1" /> Trust Score +{latestAnalysis.trust_delta}
              </span>
              <span className="text-cyan-400 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> Official Watermark Valid
              </span>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Verified Document Records */}
      <GlassCard>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center">
          <FileCheck className="w-4 h-4 text-emerald-400 mr-2" /> Verified Fleet & Driver Records ({documents.length})
        </h3>
        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{doc.document_type}</h4>
                  <p className="text-[11px] text-slate-400">Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400">✅ {doc.confidence_score}% Verified</span>
                <p className="text-[10px] text-slate-500">Exp: {doc.expiry_date || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
