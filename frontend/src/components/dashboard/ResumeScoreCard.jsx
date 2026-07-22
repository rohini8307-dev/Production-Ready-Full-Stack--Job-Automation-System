import React from 'react';

export default function ResumeScoreCard({ score = 85 }) {
  return (
    <div className="card-panel flex items-center justify-between p-4 bg-[#151A24] border border-[#1E2533] rounded-xl hover:border-[#3B82F6]/50 transition">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] text-xl">
          📄
        </div>
        <div>
          <div className="text-xs text-[#8A99AF] font-medium">Resume Score</div>
          <div className="text-2xl font-extrabold text-white mt-0.5">{score}/100</div>
          <div className="text-[11px] text-[#10B981] font-semibold mt-0.5">Great Score! 🚀</div>
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
            className="text-[#3B82F6]"
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
