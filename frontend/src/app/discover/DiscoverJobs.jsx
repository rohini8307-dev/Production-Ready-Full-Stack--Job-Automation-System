import React, { useState } from 'react';
import ScraperConsole from '../../components/scraper/ScraperConsole.jsx';
import { profileStore } from '../../store/profileStore.js';
import { scraperService } from '../../services/scraper.service.js';

export default function DiscoverJobs() {
  const [keyword, setKeyword] = useState(profileStore.primaryDomain || "React Developer");
  const [location, setLocation] = useState(profileStore.currentLocation || "India");
  const [running, setRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrigger = async () => {
    if (!profileStore.isProfileCompleted) {
      setErrorMsg("⚠️ Profile onboarding required before triggering discovery engine.");
      return;
    }
    setErrorMsg("");
    setRunning(true);
    try {
      await scraperService.runScrape(keyword, location);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card-panel p-6 bg-[#151A24] border border-[#1E2533] rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-white">Discovery & Scraper Engine (Agent 1)</h2>
          <p className="text-xs text-[#8A99AF]">Search across platforms simultaneously with automated deduplication & trust scoring.</p>
          {errorMsg && <p className="text-xs text-[#EF4444] mt-1 font-semibold">{errorMsg}</p>}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-[#0F131D] border border-[#1E2533] rounded-lg px-3 py-1.5 text-xs text-white"
            placeholder="Role keywords..."
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-[#0F131D] border border-[#1E2533] rounded-lg px-3 py-1.5 text-xs text-white"
            placeholder="Location..."
          />
          <button
            onClick={handleTrigger}
            disabled={running}
            className="btn-gold text-xs disabled:opacity-50"
          >
            {running ? "⚡ Agent Running..." : "⚡ Trigger Discovery"}
          </button>
        </div>
      </div>
      <ScraperConsole />
    </div>
  );
}
