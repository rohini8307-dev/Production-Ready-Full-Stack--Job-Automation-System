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
      {details && (
        <div className="mt-3 p-3 bg-[#0F131D] rounded-lg text-xs space-y-1.5 text-gray-300">
          <div>• Add explicit mentions of <strong>Docker</strong> in project descriptions.</div>
          <div>• Include <strong>AWS CloudWatch</strong> or <strong>Grafana</strong> monitoring metrics.</div>
          <div>• Highlight REST API throughput metrics under Backend experience.</div>
        </div>
      )}
    </div>
  );
}
