import React from 'react';

export default function ApplicantsBar({ applied = 30, total = 200 }) {
  const pct = Math.min(100, Math.round((applied / total) * 100));
  return (
    <div className="flex items-center gap-2 text-xs text-[#8A99AF]">
      <div className="w-24 h-1.5 bg-[#1E2533] rounded-full overflow-hidden">
        <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span>{applied} / {total} Applied</span>
    </div>
  );
}
