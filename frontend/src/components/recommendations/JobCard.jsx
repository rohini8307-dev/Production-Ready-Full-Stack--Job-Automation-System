import React, { useState } from 'react';
import ExplainMatch from './ExplainMatch.jsx';
import { applicationService } from '../../services/application.service.js';

export default function JobCard({ job, onBookmarkToggle }) {
  const [showExplain, setShowExplain] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toast, setToast] = useState(null);

  const priorityBadge = {
    "Priority 1": { text: "P1", class: "badge-p1" },
    "Priority 2": { text: "P2", class: "badge-p2" },
    "Priority 3": { text: "P3", class: "badge-p3" }
  }[job.priority || "Priority 1"] || { text: "P1", class: "badge-p1" };

  const oddsColor = "var(--gold-bright)";

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    await applicationService.addToBucket(job.id);
    setToast(isBookmarked ? "Removed from Bucket List" : "⭐️ Added to Bucket List");
    if (onBookmarkToggle) onBookmarkToggle(job);
    setTimeout(() => setToast(null), 2500);
  };

  const skillsList = Array.isArray(job.skills) ? job.skills : (job.skills || "React, JavaScript").split(',').map(s => s.trim());

  return (
    <div
      className="card-panel relative rounded-xl p-4 mb-3 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
    >
      {toast && (
        <div
          className="absolute -top-3 right-4 text-[11px] px-2.5 py-1 rounded-full font-bold shadow-lg animate-bounce z-10"
          style={{ background: 'var(--gold-primary)', color: '#0F0804' }}
        >
          {toast}
        </div>
      )}

      {/* Left side */}
      <div className="flex items-start gap-3.5 flex-1">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityBadge.class}`}>
          {priorityBadge.text}
        </span>

        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0 border shadow-inner"
          style={{
            background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-card))',
            borderColor: 'var(--border-main)',
            color: 'var(--gold-bright)'
          }}
        >
          {job.company ? job.company.substring(0, 1) : "D"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3
              className="text-base font-bold transition hover:opacity-80"
              style={{ color: 'var(--text-main)' }}
            >
              {job.title}
            </h3>
            <span className="badge-platform">{job.platform || "Indeed"}</span>
            <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{job.posted_time || "Posted 2h ago"}</span>
            {job.is_new && (
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-bold border"
                style={{
                  background: 'rgba(200,148,31,0.15)',
                  color: 'var(--gold-bright)',
                  borderColor: 'rgba(200,148,31,0.3)'
                }}
              >
                ✨ New
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs mt-1 flex-wrap" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-medium" style={{ color: 'var(--text-gold)' }}>{job.company}</span>
            <span>•</span>
            <span>📍 {job.location || "Bangalore, Karnataka"}</span>
            <span>•</span>
            <span className={job.work_mode === 'Remote' ? 'badge-remote' : 'badge-onsite'}>
              {job.work_mode || "On-site"}
            </span>
          </div>

          {/* Applicants Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="w-40 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, ((job.applicants_count || 30) / (job.total_openings || 200)) * 100)}%`,
                  background: 'linear-gradient(90deg, var(--gold-deep), var(--gold-bright))'
                }}
              />
            </div>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-dim)' }}>
              <strong style={{ color: 'var(--text-main)' }}>{job.applicants_count || 30}</strong> / {job.total_openings || 200} Applied
            </span>
          </div>

          {/* Skills pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skillsList.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium border"
                style={{
                  background: 'var(--bg-elevated)',
                  borderColor: 'var(--border-dim)',
                  color: 'var(--text-secondary)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex md:flex-col items-center justify-between md:items-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 flex-shrink-0" style={{ borderColor: 'var(--border-dim)' }}>
        <div className="flex items-center gap-2.5">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path strokeWidth="3.5" stroke="var(--border-main)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path strokeDasharray={`${job.shortlist_odds || 88}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="var(--gold-bright)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold leading-none" style={{ color: 'var(--text-main)' }}>{job.shortlist_odds || 88}%</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-[11px] font-medium" style={{ color: 'var(--text-dim)' }}>Shortlist Odds</div>
            <div className="text-xs font-bold" style={{ color: 'var(--gold-bright)' }}>
              {job.shortlist_odds >= 80 ? "High Match" : "Good Match"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExplain(true)}
            className="btn-outline text-xs"
          >
            View Details
          </button>
          <button
            onClick={handleBookmark}
            className="p-2 rounded-lg border transition"
            style={{
              background: isBookmarked ? 'var(--gold-subtle)' : 'var(--bg-elevated)',
              borderColor: isBookmarked ? 'var(--gold-primary)' : 'var(--border-main)',
              color: isBookmarked ? 'var(--gold-bright)' : 'var(--text-dim)'
            }}
            title="Add to Bucket List"
          >
            {isBookmarked ? "🛍️" : "📑"}
          </button>
        </div>
      </div>

      {showExplain && <ExplainMatch job={job} onClose={() => setShowExplain(false)} />}
    </div>
  );
}
