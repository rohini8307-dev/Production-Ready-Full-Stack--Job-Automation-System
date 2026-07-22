import React, { useEffect, useState } from 'react';
import { scraperService } from '../../services/scraper.service.js';
import ScraperLogs from './ScraperLogs.jsx';
import { profileStore } from '../../store/profileStore.js';

export default function ActivityFeed() {
  const [logs, setLogs] = useState([]);
  const [showAllLogs, setShowAllLogs] = useState(false);

  useEffect(() => {
    let mounted = true;
    scraperService.getLogs().then((data) => {
      if (mounted && data) setLogs(data);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="card-panel bg-[#151A24] border border-[#1E2533] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Agent Activity Feed</h3>
        <span className="flex items-center gap-1.5 text-xs text-[#10B981] font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          • Live
        </span>
      </div>

      <div className="space-y-3">
        {!profileStore.isProfileCompleted ? (
          <div className="p-3 bg-[#0F131D] rounded-lg border border-[#1E2533] text-center text-xs text-[#8A99AF]">
            All 4 Autonomous Agents are on standby waiting for profile onboarding to activate criteria.
          </div>
        ) : logs.length === 0 ? (
          <div className="p-3 bg-[#0F131D] rounded-lg border border-[#1E2533] text-center text-xs text-[#8A99AF]">
            System ready. Click ⚡ Start New Scrape across platforms.
          </div>
        ) : (
          logs.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#1C2230] transition">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30 flex-shrink-0">
                ⚡
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white">{item.agent || "Agent System"}</div>
                <div className="text-[11px] text-[#8A99AF] truncate">{item.message || JSON.stringify(item)}</div>
              </div>
              <span className="text-[10px] text-[#5D6A80] font-mono whitespace-nowrap">{item.time || "Just now"}</span>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setShowAllLogs(true)}
        className="w-full mt-4 py-2 bg-[#1C2230] hover:bg-[#252D3D] border border-[#1E2533] rounded-lg text-xs font-semibold text-[#60A5FA] transition flex items-center justify-center gap-1.5"
      >
        <span>View All Logs</span>
        <span>→</span>
      </button>

      {showAllLogs && <ScraperLogs logs={logs} onClose={() => setShowAllLogs(false)} />}
    </div>
  );
}
