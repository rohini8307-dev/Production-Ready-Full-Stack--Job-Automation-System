import React from 'react';

export default function ResumeScoreCard({ score = 85 }) {
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
          📄
        </div>
        <div>
          <div className="text-xs font-medium" style={{ color: 'var(--text-dim)' }}>Resume Score</div>
          <div className="text-2xl font-extrabold mt-0.5" style={{ color: 'var(--text-main)' }}>{score}/100</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--gold-bright)' }}>High Quality 🚀</div>
        </div>
      </div>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path strokeWidth="3.5" stroke="var(--border-main)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path strokeDasharray={`${score}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="var(--gold-bright)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
      </div>
    </div>
  );
}
