import React from 'react';

export default function AppliedJobsCard({ count = 24, change = "+ 6 this week" }) {
  return (
    <div className="card-panel flex items-center justify-between p-4 bg-[#151A24] border border-[#1E2533] rounded-xl hover:border-[#3B82F6]/50 transition">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] text-xl">
          ✈️
        </div>
        <div>
          <div className="text-xs text-[#8A99AF] font-medium">Applied Jobs</div>
          <div className="text-2xl font-extrabold text-white mt-0.5">{count}</div>
          <div className="text-[11px] text-[#10B981] font-semibold mt-0.5">↑ {change}</div>
        </div>
      </div>
    </div>
  );
}
