import React from 'react';

export default function AppliedJobsCard({ count = 0, change = "0 applied" }) {
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
          ✈️
        </div>
        <div>
          <div className="text-xs font-medium" style={{ color: 'var(--text-dim)' }}>Applied Jobs</div>
          <div className="text-2xl font-extrabold mt-0.5" style={{ color: 'var(--text-main)' }}>{count}</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--gold-bright)' }}>↑ {change}</div>
        </div>
      </div>
    </div>
  );
}
