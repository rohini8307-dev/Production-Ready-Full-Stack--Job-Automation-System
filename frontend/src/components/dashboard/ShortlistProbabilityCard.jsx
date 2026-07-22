import React from 'react';

export default function ShortlistProbabilityCard({ percentage = 0 }) {
  return (
    <div
      className="card-panel flex items-center justify-between p-4 rounded-xl transition"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
    >
      <div className="flex items-center gap-3.5">
        <div
          className="w-11 h-11 rounded-lg border flex items-center justify-center text-xl"
          style={{ background: 'var(--gold-subtle)', borderColor: 'var(--border-gold)', color: 'var(--gold-bright)' }}
        >
          🎯
        </div>
        <div>
          <div className="text-xs font-medium" style={{ color: 'var(--text-dim)' }}>Shortlist Odds</div>
          <div className="text-2xl font-extrabold mt-0.5" style={{ color: 'var(--text-main)' }}>{percentage}%</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--gold-bright)' }}>AI Probability</div>
        </div>
      </div>
    </div>
  );
}
