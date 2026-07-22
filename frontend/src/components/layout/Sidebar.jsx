import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'discover', label: 'Discover Jobs', icon: '🔍' },
    { id: 'recommendations', label: 'Recommendations', icon: '✨' },
    { id: 'priority', label: 'Priority Jobs', icon: '⭐', badge: 'P1', badgeColor: 'bg-[#C8941F]/20 text-[#E8B84B] border border-[#C8941F]/40' },
    { id: 'bucketlist', label: 'Bucket List', icon: '🛍️' },
    { id: 'applied', label: 'Applied Jobs', icon: '✈️' },
    { id: 'applications', label: 'Application Tracker', icon: '📋', hasArrow: true },
    { id: 'profile', label: 'Resume & Profile', icon: '📄' },
    { id: 'analytics', label: 'Analytics', icon: '📊', hasArrow: true },
    { id: 'roadmap', label: 'Skill Gap & Roadmap', icon: '🗺️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const agents = [
    { name: 'Agent 1 Discovery', status: 'Active', color: 'bg-[#C8941F]' },
    { name: 'Agent 2 Intelligence', status: 'Active', color: 'bg-[#C8941F]' },
    { name: 'Agent 3 Student Intel', status: 'Ready', color: 'bg-[#9B6840]' },
    { name: 'Agent 4 Matching', status: 'Active', color: 'bg-[#C8941F]' },
  ];

  return (
    <aside
      className="w-64 flex flex-col justify-between p-4 flex-shrink-0 h-screen sticky top-0 border-r"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-main)' }}
    >
      <div>
        <div className="flex items-center gap-3 mb-6 px-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-deep))',
              color: '#0F0804',
              boxShadow: '0 4px 14px var(--gold-glow)'
            }}
          >
            ◈
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wider text-gold-gradient" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              NOAH NEXUS
            </h1>
            <p className="text-[10px] text-dim tracking-wider uppercase" style={{ color: 'var(--text-dim)' }}>
              Career Intelligence
            </p>
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
                  isActive ? 'sidebar-active' : 'hover:bg-[#1A0F08]'
                }`}
                style={{
                  color: isActive ? 'var(--gold-bright)' : 'var(--text-secondary)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.hasArrow && <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>›</span>}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-dim)' }}>
        <div className="text-[11px] font-bold tracking-wider uppercase mb-2 px-2" style={{ color: 'var(--text-dim)' }}>
          AGENT SYSTEM STATUS
        </div>
        <div className="space-y-2 mb-4 px-2">
          {agents.map((ag) => (
            <div key={ag.name} className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span>{ag.name}</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${ag.color} animate-pulse`} />
                <span style={{ color: 'var(--text-gold)', fontWeight: 600 }}>
                  {ag.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('analytics')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition border"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-main)',
            color: 'var(--text-secondary)'
          }}
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
