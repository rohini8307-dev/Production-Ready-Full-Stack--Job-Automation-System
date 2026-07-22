import React from 'react';

export default function ShortlistMeter({ odds = 88 }) {
  return (
    <div className="flex flex-col items-end">
      <span className="text-base font-extrabold text-[#10B981]">{odds}% Shortlist Odds</span>
    </div>
  );
}
