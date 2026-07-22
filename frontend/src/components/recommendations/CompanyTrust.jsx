import React from 'react';

export default function CompanyTrust({ trustScore = 0.98 }) {
  return (
    <span className="px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded text-xs font-semibold">
      🛡️ {Math.round(trustScore * 100)}% Trust
    </span>
  );
}
