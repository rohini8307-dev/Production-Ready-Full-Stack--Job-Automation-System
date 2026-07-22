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
    <div
      className="card-panel rounded-xl p-4 border"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Agent Activity Feed</h3>
        <span
          className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border"
          style={{ background: 'var(--gold-subtle)', borderColor: 'var(--border-gold)', color: 'var(--gold-bright)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: 'var(--gold-bright)' }} />
          • Live
        </span>
      </div>

      <div className="space-y-3">
        {!profileStore.isProfileCompleted ? (
          <div
            className="p-3 rounded-lg border text-center text-xs"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-dim)', color: 'var(--text-dim)' }}
          >
            All 4 Autonomous Agents are on standby waiting for profile onboarding to activate criteria.
          </div>
        ) : logs.length === 0 ? (
          <div
            className="p-3 rounded-lg border text-center text-xs"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-dim)', color: 'var(--text-dim)' }}
          >
            System ready. Click ⚡ Start New Scrape across platforms.
          </div>
        ) : (
          logs.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-2 rounded-lg transition hover:bg-[#2C1A0C]"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border flex-shrink-0"
                style={{ background: 'var(--gold-subtle)', borderColor: 'var(--border-gold)', color: 'var(--gold-bright)' }}
              >
                ⚡
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>{item.agent || "Agent System"}</div>
                <div className="text-[11px] truncate" style={{ color: 'var(--text-secondary)' }}>{item.message || JSON.stringify(item)}</div>
              </div>
              <span className="text-[10px] font-mono whitespace-nowrap" style={{ color: 'var(--text-dim)' }}>{item.time || "Just now"}</span>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setShowAllLogs(true)}
        className="w-full mt-4 py-2 rounded-lg text-xs font-semibold transition border flex items-center justify-center gap-1.5"
        style={{
          background: 'var(--bg-elevated)',
          borderColor: 'var(--border-main)',
          color: 'var(--text-gold)'
        }}
      >
        <span>View All Logs</span>
        <span>→</span>
      </button>

      {showAllLogs && <ScraperLogs logs={logs} onClose={() => setShowAllLogs(false)} />}
    </div>
  );
}
