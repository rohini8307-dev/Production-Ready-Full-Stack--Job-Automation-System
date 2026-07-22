import React, { useState } from 'react';
import { scraperService } from '../../services/scraper.service.js';
import { profileStore } from '../../store/profileStore.js';
import { notificationStore } from '../../store/notificationStore.js';

export default function Topbar({ onOpenWizard, onScrapeTriggered, isProfileCompleted }) {
  const [search, setSearch] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info'); // 'info' | 'warn' | 'error'

  const showToast = (msg, type = 'info', duration = 4000) => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), duration);
  };

  const handleStartScrape = async () => {
    // Gate: profile must be completed first
    if (!isProfileCompleted) {
      showToast("⚠️ Complete your profile first! Redirecting to Career Wizard...", 'warn', 5000);
      if (onOpenWizard) onOpenWizard();
      return;
    }

    setIsScraping(true);
    showToast(
      `⚡ Agent 1 Discovery started — crawling for ${profileStore.primaryDomain || "roles"} in ${profileStore.currentLocation || "your locations"}...`,
      'info',
      10000
    );

    try {
      await scraperService.runScrape(
        profileStore.primaryDomain || "Software Engineer",
        profileStore.currentLocation || "India"
      );
      showToast("✅ Discovery complete! Fresh positions are now in your dashboard.", 'success');
      if (onScrapeTriggered) onScrapeTriggered();
    } catch (e) {
      showToast("❌ Scrape failed — check backend connectivity.", 'error');
    } finally {
      setIsScraping(false);
    }
  };

  const toastBorderColor = {
    info: '#3B82F6',
    warn: '#F59E0B',
    success: '#10B981',
    error: '#EF4444'
  }[toastType] || '#3B82F6';

  return (
    <header className="h-16 bg-[#0F131D] border-b border-[#1E2533] px-6 flex items-center justify-between sticky top-0 z-40 w-full">
      {/* Search */}
      <div className="flex items-center max-w-sm w-full relative mr-4">
        <span className="absolute left-3 text-[#5D6A80] text-xs">🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs, skills, companies..."
          className="w-full bg-[#151A24] border border-[#1E2533] rounded-lg pl-8 pr-12 py-1.5 text-xs text-white placeholder-[#5D6A80] focus:outline-none focus:border-[#3B82F6] transition"
        />
        <span className="absolute right-2.5 px-1.5 py-0.5 bg-[#1E2533] rounded text-[10px] text-[#8A99AF] font-mono">
          ⌘ K
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Toast */}
        {toastMsg && (
          <div
            className="bg-[#1C2230] text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg animate-fade-in border max-w-xs"
            style={{ borderColor: toastBorderColor }}
          >
            {toastMsg}
          </div>
        )}

        {/* Start New Scrape Button */}
        <button
          id="start-scrape-btn"
          onClick={handleStartScrape}
          disabled={isScraping}
          title={!isProfileCompleted ? "Complete profile onboarding first" : "Trigger Agent 1 Discovery"}
          className={`btn-gold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition ${
            !isProfileCompleted ? 'opacity-75' : 'shadow-amber-500/20 hover:shadow-amber-500/30'
          }`}
        >
          <span>⚡</span>
          <span>{isScraping ? "Scraping..." : "Start New Scrape"}</span>
          {!isProfileCompleted && (
            <span className="ml-1 text-[10px] bg-amber-900/60 px-1.5 py-0.5 rounded font-normal">Profile needed</span>
          )}
        </button>

        {/* Career Wizard Button */}
        <button
          id="career-wizard-btn"
          onClick={onOpenWizard}
          className="bg-[#1C2230] hover:bg-[#252D3D] text-[#60A5FA] border border-[#3B82F6]/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
        >
          🪄 Career Wizard
          {isProfileCompleted && (
            <span className="ml-1 text-[#10B981] text-[10px]">✓</span>
          )}
        </button>

        {/* Notifications Bell */}
        <div className="relative cursor-pointer w-9 h-9 rounded-lg bg-[#151A24] border border-[#1E2533] flex items-center justify-center hover:bg-[#1C2230] transition">
          <span className="text-base">🔔</span>
          {notificationStore.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full text-[10px] text-white font-bold flex items-center justify-center">
              {notificationStore.unreadCount}
            </span>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#1E2533]">
          <div className="text-right hidden md:block">
            <div className="text-sm font-semibold text-white leading-tight">
              {isProfileCompleted && profileStore.fullName ? profileStore.fullName : "Guest User"}
            </div>
            <div className="text-xs text-[#8A99AF]">
              {isProfileCompleted && profileStore.email ? profileStore.email : "No profile — complete onboarding"}
            </div>
          </div>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shadow-md ${
              isProfileCompleted
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white'
                : 'bg-[#1C2230] border border-[#1E2533] text-[#8A99AF]'
            }`}
          >
            {isProfileCompleted && profileStore.fullName
              ? profileStore.fullName.slice(0, 2).toUpperCase()
              : "?"}
          </div>
        </div>
      </div>
    </header>
  );
}
