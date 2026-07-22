import React from 'react';

export default function PriorityTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Priority 1', label: 'Priority 1' },
    { id: 'Priority 2', label: 'Priority 2' },
    { id: 'Priority 3', label: 'Priority 3' },
  ];

  return (
    <div
      className="flex items-center gap-2 p-1.5 rounded-xl border"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-main)' }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-1.5 rounded-lg text-xs font-bold transition border"
            style={{
              background: isActive ? 'linear-gradient(135deg, var(--gold-primary), var(--gold-deep))' : 'transparent',
              borderColor: isActive ? 'var(--gold-bright)' : 'transparent',
              color: isActive ? '#0F0804' : 'var(--text-secondary)'
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
