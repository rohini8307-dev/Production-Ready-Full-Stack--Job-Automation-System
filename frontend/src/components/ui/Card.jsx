import React from 'react';

export default function Card({ children, className = "" }) {
  return <div className={`card-panel bg-[#151A24] border border-[#1E2533] rounded-xl p-4 ${className}`}>{children}</div>;
}
