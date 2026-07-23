import React, { useState } from 'react';
import { scraperService } from '../../services/scraper.service.js';
import { profileStore } from '../../store/profileStore.js';
import { notificationStore } from '../../store/notificationStore.js';

export default function Topbar({ onOpenWizard, onScrapeTriggered, isProfileCompleted, session, onLogout }) {
  const [search, setSearch] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info');

  const showToast = (msg, type = 'info', duration = 4000) => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), duration);
  };

  const handleStartScrape = async () => {
    if (!isProfileCompleted) {
      showToast("⚠️ Complete your profile first! Opening Career Wizard...", 'warn', 5000);
      if (onOpenWizard) onOpenWizard();
      return;
    }

    setIsScraping(true);
    showToast(
      `⚡ Agent 1 Discovery active — scanning for ${profileStore.primaryDomain || "roles"} in ${profileStore.currentLocation || "locations"}...`,
      'info',
      10000
    );

    try {
      await scraperService.runScrape(
        profileStore.primaryDomain || "Software Engineer",
        profileStore.currentLocation || "India"
      );
      showToast("✅ Discovery complete! Fresh job matches updated.", 'success');
      if (onScrapeTriggered) onScrapeTriggered();
    } catch (e) {
      showToast("❌ Scrape failed — backend unavailable.", 'error');
    } finally {
      setIsScraping(false);
    }
  };

  const userName = session?.name || (isProfileCompleted && profileStore.fullName ? profileStore.fullName : "User");
  const userEmail = session?.email || (isProfileCompleted && profileStore.email ? profileStore.email : "user@nexus.ai");

  return (
    <header
      className="h-16 px-6 flex items-center justify-between sticky top-0 z-40 w-full border-b"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-main)' }}
    >
      {/* Search */}
      <div className="flex items-center max-w-sm w-full relative mr-4">
        <span className="absolute left-3 text-xs" style={{ color: 'var(--text-dim)' }}>🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs, skills, companies..."
          className="w-full rounded-lg pl-8 pr-12 py-1.5 text-xs transition"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border-main)',
            color: 'var(--text-main)'
          }}
        />
        <span
          className="absolute right-2.5 px-1.5 py-0.5 rounded text-[10px] font-mono"
          style={{ background: 'var(--bg-card)', color: 'var(--text-dim)', border: '1px solid var(--border-dim)' }}
        >
          ⌘ K
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Toast */}
        {toastMsg && (
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg animate-fade-in max-w-xs border"
            style={{
              background: 'var(--bg-card)',
              borderColor: toastType === 'error' ? 'var(--status-error)' : 'var(--gold-primary)',
              color: 'var(--text-main)'
            }}
          >
            {toastMsg}
          </div>
        )}

        {/* Start New Scrape Button */}
        <button
          id="start-scrape-btn"
          onClick={handleStartScrape}
          disabled={isScraping}
          className="btn-gold shadow-lg disabled:opacity-50 transition"
        >
          <span>⚡</span>
          <span>{isScraping ? "Scraping..." : "Start New Scrape"}</span>
          {!isProfileCompleted && (
            <span
              className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-normal"
              style={{ background: 'rgba(107,61,32,0.4)', color: 'var(--text-gold)' }}
            >
              Profile needed
            </span>
          )}
        </button>



        {/* Notifications */}
        <div
          className="relative cursor-pointer w-9 h-9 rounded-lg border flex items-center justify-center transition"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
        >
          <span className="text-base">🔔</span>
          {notificationStore.unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
              style={{ background: 'var(--gold-primary)', color: '#0F0804' }}
            >
              {notificationStore.unreadCount}
            </span>
          )}
        </div>

        {/* User Session Profile & Logout */}
        <div className="flex items-center gap-3 pl-2 border-l" style={{ borderColor: 'var(--border-main)' }}>
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
              {userName}
            </div>
            <div className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              {userEmail}
            </div>
          </div>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-md border"
            style={{
              background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-deep))',
              color: '#0F0804',
              borderColor: 'var(--border-gold)'
            }}
          >
            {userName.slice(0, 2).toUpperCase()}
          </div>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out Session"
              className="px-2 py-1 rounded text-xs transition border"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-main)',
                color: 'var(--text-dim)'
              }}
            >
              🚪 Exit
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
