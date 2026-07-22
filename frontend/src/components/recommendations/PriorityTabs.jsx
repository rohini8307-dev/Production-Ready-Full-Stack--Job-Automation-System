import React from 'react';

export default function PriorityTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'All', label: 'All', count: null },
    { id: 'Priority 1', label: 'Priority 1', color: 'text-[#EF4444] border-[#EF4444]' },
    { id: 'Priority 2', label: 'Priority 2', color: 'text-[#F97316] border-[#F97316]' },
    { id: 'Priority 3', label: 'Priority 3', color: 'text-[#3B82F6] border-[#3B82F6]' },
  ];

  return (
    <div className="flex items-center gap-2 bg-[#0F131D] p-1.5 rounded-xl border border-[#1E2533]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              isActive
                ? `bg-[#1E293B] ${tab.color || 'text-white border-[#3B82F6]'} border shadow-sm`
                : 'text-[#8A99AF] hover:text-white hover:bg-[#151A24]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
