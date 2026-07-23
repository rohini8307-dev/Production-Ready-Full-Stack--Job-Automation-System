import React, { useState } from 'react';

export default function ATSAnalysis({ summary }) {
  const [details, setDetails] = useState(false);
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-white">ATS Compatibility & Keyword Density</h4>
        <span className="badge-p1">ATS Score: {summary?.ats_score || 78}/100</span>
      </div>
      <p className="text-xs text-[#8A99AF] leading-relaxed mb-3">
        Your profile demonstrates high alignment with modern Full Stack requirements. Quantify leadership metrics for &gt;90% compatibility.
      </p>
      <button
        onClick={() => setDetails(!details)}
        className="text-xs font-semibold text-[#3B82F6] hover:underline"
      >
        {details ? "Hide Suggestions" : "View ATS Keyword Improvements →"}
      </button>
      {details && summary?.suggestions && summary.suggestions.length > 0 && (
        <div className="mt-3 p-3 bg-[#0F131D] rounded-lg text-xs space-y-1.5 text-gray-300">
          {summary.suggestions.map((s, idx) => (
            <div key={idx}>• {s}</div>
          ))}
        </div>
      )}
    </div>
  );
}
