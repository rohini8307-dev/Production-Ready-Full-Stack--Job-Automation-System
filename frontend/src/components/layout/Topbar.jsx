import React, { useState } from 'react';
import { scraperService } from '../../services/scraper.service.js';
import { profileStore } from '../../store/profileStore.js';
import { notificationStore } from '../../store/notificationStore.js';

export default function Topbar({ onOpenWizard, onScrapeTriggered }) {
  const [search, setSearch] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const handleStartScrape = async () => {
    if (!profileStore.isProfileCompleted) {
      setToastMsg("⚠️ Please complete your profile onboarding before triggering Agent 1 Discovery!");
      if (onOpenWizard) onOpenWizard();
      setTimeout(() => setToastMsg(null), 5000);
      return;
    }

    setIsScraping(true);
    setToastMsg(`⚡ Agent 1 Discovery initiated: Crawling platforms for ${profileStore.primaryDomain || "roles"} in ${profileStore.currentLocation || "preferences"}...`);
    try {
      const res = await scraperService.runScrape(profileStore.primaryDomain || "Software Engineer", profileStore.currentLocation || "India");
      setToastMsg(`✅ Scrape Completed! Found real-time positions for your domain.`);
      if (onScrapeTriggered) onScrapeTriggered();
    } catch (e) {
      setToastMsg("⚠️ Scrape failed. Please verify platform connectivity or API endpoints.");
    } finally {
      setIsScraping(false);
      setTimeout(() => setToastMsg(null), 4000);
    }
  };

  return (
    <header className="h-16 bg-[#0F131D] border-b border-[#1E2533] px-6 flex items-center justify-between sticky top-0 z-40 w-full">
      {/* Search Bar */}
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

      {/* Action Buttons & Profile */}
      <div className="flex items-center gap-4">
        {toastMsg && (
          <div className="bg-[#1C2230] border border-[#F59E0B] text-white px-3 py-1.5 rounded-lg text-xs font-medium animate-fade-in shadow-lg">
            {toastMsg}
          </div>
        )}

        <button
          onClick={handleStartScrape}
          disabled={isScraping}
          className="btn-gold shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 disabled:opacity-50"
        >
          <span>⚡</span>
          <span>{isScraping ? "Scraping..." : "Start New Scrape"}</span>
        </button>

        <button
          onClick={onOpenWizard}
          className="bg-[#1C2230] hover:bg-[#252D3D] text-[#60A5FA] border border-[#3B82F6]/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
        >
          🪄 Career Wizard
        </button>

        <div className="relative cursor-pointer w-9 h-9 rounded-lg bg-[#151A24] border border-[#1E2533] flex items-center justify-center hover:bg-[#1C2230] transition">
          <span className="text-base">🔔</span>
          {notificationStore.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full text-[10px] text-white font-bold flex items-center justify-center">
              {notificationStore.unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-[#1E2533]">
          <div className="text-right hidden md:block">
            <div className="text-sm font-semibold text-white leading-tight">
              {profileStore.fullName || "Guest User"}
            </div>
            <div className="text-xs text-[#8A99AF]">
              {profileStore.email || "No profile active"}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-extrabold flex items-center justify-center text-sm shadow-md">
            {profileStore.fullName ? profileStore.fullName.slice(0, 2).toUpperCase() : "👤"}
          </div>
        </div>
      </div>
    </header>
  );
}

