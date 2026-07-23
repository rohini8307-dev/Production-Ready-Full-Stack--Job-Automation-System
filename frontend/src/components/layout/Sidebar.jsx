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



  return (
    <aside
      className="w-64 hidden md:flex flex-col justify-between p-4 flex-shrink-0 h-screen sticky top-0 border-r"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-main)' }}
    >
      <div>
        <div className="flex items-center gap-3 mb-6 px-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-deep))',
              color: '#FFFFFF',
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
                  isActive ? 'sidebar-active' : 'hover:bg-gray-200'
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

    </aside>
  );
}
