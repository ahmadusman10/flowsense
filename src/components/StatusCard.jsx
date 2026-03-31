import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function StatusCard({ prediction }) {
  if (!prediction) return null;

  const { status, message, severity } = prediction;

  if (status === 'loading') {
    return (
      <div className="glass-panel p-4 flex items-center gap-4 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-slate-700/50"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-700/50 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-slate-700/50 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const iconMap = {
    high: <AlertCircle className="w-6 h-6 text-rose-500" />,
    medium: <Info className="w-6 h-6 text-amber-500" />,
    low: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
  };

  const getSeverityGlow = (sev) => {
    switch (sev) {
      case 'high': return 'shadow-[0_0_20px_rgba(244,63,94,0.3)] border-rose-500/50';
      case 'medium': return 'shadow-[0_0_20px_rgba(245,158,11,0.3)] border-amber-500/50';
      case 'low': return 'shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/50';
      default: return '';
    }
  };

  return (
    <div className={`glass-panel p-5 flex items-start gap-4 transition-all duration-500 ease-out transform ${getSeverityGlow(severity)}`}>
      <div className="mt-1 flex-shrink-0">
        {iconMap[severity] || <Info className="w-6 h-6 text-accent" />}
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">AI Prediction</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
