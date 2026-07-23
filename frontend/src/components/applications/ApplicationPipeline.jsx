import React from 'react';

export default function ApplicationPipeline({ counts }) {
  const stages = [
    { name: "Applied", count: counts?.Applied || 0, color: "bg-[#3B82F6]" },
    { name: "Screening", count: counts?.Screening || 0, color: "bg-[#F59E0B]" },
    { name: "Assessment", count: counts?.Assessment || 0, color: "bg-[#8B5CF6]" },
    { name: "Interview", count: counts?.Interview || 0, color: "bg-[#10B981]" },
    { name: "Offer", count: counts?.Offer || 0, color: "bg-[#EC4899]" },
  ];

  return (
    <div className="card-panel p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Application Pipeline Status</h3>
      <div className="grid grid-cols-5 gap-2 text-center">
        {stages.map((s, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xl font-black text-gray-900">{s.count}</div>
            <div className="text-[11px] text-gray-500 mt-1">{s.name}</div>
            <div className={`h-1 w-8 mx-auto mt-2 rounded-full ${s.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
