import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, FileText } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

export const VerificationQueue: React.FC = () => {
  const { documents } = useApp();

  return (
    <GlassCard glow className="bg-white border-slate-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2" /> Driver Document & Truck Verification Queue
          </h3>
          <p className="text-xs text-slate-500 font-medium">Gemini AI real-time document authenticity audit logs</p>
        </div>
        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
          Auto Audit Active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <th className="py-3 px-4">Document Type</th>
              <th className="py-3 px-4">Driver ID / Ref</th>
              <th className="py-3 px-4">Uploaded Date</th>
              <th className="py-3 px-4">Gemini Confidence</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {documents.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 uppercase">{doc.document_type}</td>
                <td className="py-3 px-4 text-slate-500 font-mono">{doc.driver_id}</td>
                <td className="py-3 px-4">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                <td className="py-3 px-4 font-bold text-indigo-700">{doc.confidence_score}% Match</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Verified
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200">
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
