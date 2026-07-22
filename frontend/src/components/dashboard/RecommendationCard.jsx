import React from 'react';

export default function RecommendationCard({ count = 128, change = "+ 24 new today" }) {
  return (
    <div className="card-panel flex items-center justify-between p-4 bg-[#151A24] border border-[#1E2533] rounded-xl hover:border-[#10B981]/50 transition">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xl">
          💼
        </div>
        <div>
          <div className="text-xs text-[#8A99AF] font-medium">Active Recommendations</div>
          <div className="text-2xl font-extrabold text-white mt-0.5">{count}</div>
          <div className="text-[11px] text-[#10B981] font-semibold mt-0.5">↑ {change}</div>
        </div>
      </div>
    </div>
  );
}
