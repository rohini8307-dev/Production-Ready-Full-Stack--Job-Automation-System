import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'discover', label: 'Discover Jobs', icon: '🔍' },
    { id: 'recommendations', label: 'Recommendations', icon: '✨' },
    { id: 'priority', label: 'Priority Jobs', icon: '⭐', badge: '12', badgeColor: 'bg-[#F59E0B] text-black font-bold' },
    { id: 'bucketlist', label: 'Bucket List', icon: '🛍️', badge: '8', badgeColor: 'bg-[#8B5CF6] text-white font-bold' },
    { id: 'applied', label: 'Applied Jobs', icon: '✈️', badge: '24', badgeColor: 'bg-[#10B981] text-black font-bold' },
    { id: 'applications', label: 'Application Tracker', icon: '📋', hasArrow: true },
    { id: 'profile', label: 'Resume & Profile', icon: '📄' },
    { id: 'analytics', label: 'Analytics', icon: '📊', hasArrow: true },
    { id: 'roadmap', label: 'Skill Gap & Roadmap', icon: '🗺️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: '5', badgeColor: 'bg-[#EF4444] text-white font-bold' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const agents = [
    { name: 'Agent 1 Discovery', status: 'Running', color: 'bg-[#10B981]' },
    { name: 'Agent 2 Intelligence', status: 'Running', color: 'bg-[#10B981]' },
    { name: 'Agent 3 Student Intel', status: 'Idle', color: 'bg-[#F59E0B]' },
    { name: 'Agent 4 Matching', status: 'Running', color: 'bg-[#10B981]' },
  ];

  return (
    <aside className="w-64 bg-[#0F131D] border-r border-[#1E2533] flex flex-col justify-between p-4 flex-shrink-0 h-screen sticky top-0">
      <div>
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#0B0E14] font-black text-xl shadow-lg shadow-amber-500/20">
            ◈
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wider text-white">NOAH</h1>
            <p className="text-[10px] text-[#8A99AF] font-medium tracking-tight">NexusAI Platform</p>
          </div>
        </div>

        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-270px)] pr-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1E293B] text-white border-l-4 border-[#3B82F6] pl-2 shadow-md'
                    : 'text-[#8A99AF] hover:text-white hover:bg-[#151A24]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.hasArrow && <span className="text-[10px] text-[#5D6A80]">›</span>}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1E2533]">
        <div className="text-[11px] font-bold text-[#5D6A80] tracking-wider uppercase mb-2 px-2">
          AGENT STATUS
        </div>
        <div className="space-y-2 mb-4 px-2">
          {agents.map((ag) => (
            <div key={ag.name} className="flex items-center justify-between text-xs text-[#8A99AF]">
              <span>{ag.name}</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${ag.color} animate-pulse`} />
                <span className={ag.status === 'Running' ? 'text-[#10B981] font-medium' : 'text-[#F59E0B] font-medium'}>
                  {ag.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('analytics')}
          className="w-full flex items-center justify-between px-3 py-2 bg-[#151A24] hover:bg-[#1C2230] rounded-lg text-xs font-medium text-[#8A99AF] hover:text-white transition border border-[#1E2533]"
        >
          <div className="flex items-center gap-2">
            <span>💻</span>
            <span>System Logs</span>
          </div>
          <span>›</span>
        </button>
      </div>
    </aside>
  );
}
