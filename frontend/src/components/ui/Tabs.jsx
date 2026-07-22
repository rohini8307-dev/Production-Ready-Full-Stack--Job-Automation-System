import React from 'react';

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 bg-[#0F131D] p-1 rounded-xl">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-3 py-1 text-xs rounded-lg font-bold ${active === t.id ? "bg-[#1E293B] text-white" : "text-[#8A99AF]"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
