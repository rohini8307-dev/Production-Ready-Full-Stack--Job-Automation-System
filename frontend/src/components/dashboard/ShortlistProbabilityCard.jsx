import React from 'react';

export default function ShortlistProbabilityCard({ percentage = 72 }) {
  return (
    <div className="card-panel flex items-center justify-between p-4 bg-[#151A24] border border-[#1E2533] rounded-xl hover:border-[#8B5CF6]/50 transition">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] text-xl">
          📈
        </div>
        <div>
          <div className="text-xs text-[#8A99AF] font-medium">Shortlist Probability</div>
          <div className="text-2xl font-extrabold text-white mt-0.5">{percentage}%</div>
          <div className="text-[11px] text-[#8A99AF] mt-0.5">Average across jobs</div>
        </div>
      </div>
    </div>
  );
}
