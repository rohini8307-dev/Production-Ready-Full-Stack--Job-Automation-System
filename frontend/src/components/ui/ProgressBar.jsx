import React from 'react';

export default function ProgressBar({ value = 50, max = 100, color = "bg-[#3B82F6]" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-1.5 bg-[#1E2533] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
