import React from 'react';

export default function EmptyState({ title = "No Items Found", message = "No data matches your criteria." }) {
  return (
    <div className="card-panel p-12 text-center text-[#8A99AF]">
      <div className="text-3xl mb-2">📂</div>
      <div className="text-sm font-bold text-white mb-1">{title}</div>
      <div className="text-xs">{message}</div>
    </div>
  );
}
