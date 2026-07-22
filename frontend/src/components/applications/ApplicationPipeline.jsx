import React from 'react';

export default function ApplicationPipeline({ counts }) {
  const stages = [
    { name: "Applied", count: counts?.Applied || 24, color: "bg-[#3B82F6]" },
    { name: "Screening", count: counts?.Screening || 18, color: "bg-[#F59E0B]" },
    { name: "Assessment", count: counts?.Assessment || 6, color: "bg-[#8B5CF6]" },
    { name: "Interview", count: counts?.Interview || 3, color: "bg-[#10B981]" },
    { name: "Offer", count: counts?.Offer || 1, color: "bg-[#EC4899]" },
  ];

  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h3 className="text-sm font-bold text-white mb-3">Application Pipeline Status</h3>
      <div className="grid grid-cols-5 gap-2 text-center">
        {stages.map((s, i) => (
          <div key={i} className="p-3 bg-[#0F131D] rounded-lg border border-[#1E2533]">
            <div className="text-xl font-black text-white">{s.count}</div>
            <div className="text-[11px] text-[#8A99AF] mt-1">{s.name}</div>
            <div className={`h-1 w-8 mx-auto mt-2 rounded-full ${s.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
