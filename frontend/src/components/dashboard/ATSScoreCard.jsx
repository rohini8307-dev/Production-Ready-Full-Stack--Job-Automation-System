import React from 'react';

export default function ATSScoreCard({ score = 78 }) {
  return (
    <div className="card-panel flex items-center justify-between p-4 bg-[#151A24] border border-[#1E2533] rounded-xl hover:border-[#F59E0B]/50 transition">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-xl">
          ⚓
        </div>
        <div>
          <div className="text-xs text-[#8A99AF] font-medium">ATS Score</div>
          <div className="text-2xl font-extrabold text-white mt-0.5">{score}/100</div>
          <div className="text-[11px] text-[#F59E0B] font-semibold mt-0.5">Good Score</div>
        </div>
      </div>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-[#1E2533]"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#F59E0B]"
            strokeDasharray={`${score}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    </div>
  );
}
