import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, FileText } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

export const VerificationQueue: React.FC = () => {
  const { documents } = useApp();

  return (
    <GlassCard glow>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" /> Driver Document & Truck Verification Queue
          </h3>
          <p className="text-xs text-slate-400">Gemini AI real-time document authenticity audit logs</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Auto Audit Active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Document Type</th>
              <th className="py-3 px-4">Driver ID / Ref</th>
              <th className="py-3 px-4">Uploaded Date</th>
              <th className="py-3 px-4">Gemini Confidence</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {documents.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-white uppercase">{doc.document_type}</td>
                <td className="py-3 px-4 text-slate-400 font-mono">{doc.driver_id}</td>
                <td className="py-3 px-4">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                <td className="py-3 px-4 font-bold text-purple-400">{doc.confidence_score}% Match</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700">
                    Audit Log
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
