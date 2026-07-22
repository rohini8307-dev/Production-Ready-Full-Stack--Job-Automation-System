import React from 'react';

export default function BucketCard({ job, onRemove }) {
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-sm font-bold text-white">{job.title}</h4>
        <div className="text-xs text-[#8A99AF]">{job.company} • {job.location}</div>
      </div>
      <button
        onClick={() => onRemove(job.id)}
        className="px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] rounded text-xs font-semibold"
      >
        Remove
      </button>
    </div>
  );
}
