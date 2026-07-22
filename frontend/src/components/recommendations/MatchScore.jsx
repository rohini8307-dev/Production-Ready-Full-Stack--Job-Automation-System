import React from 'react';

export default function MatchScore({ score = 88 }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-extrabold text-[#10B981]">{score}%</span>
      <span className="text-xs text-[#8A99AF]">Compatibility</span>
    </div>
  );
}
