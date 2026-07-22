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

  const oddsColor = job.shortlist_odds >= 80 ? "#10B981" : job.shortlist_odds >= 65 ? "#F59E0B" : "#3B82F6";

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    await applicationService.addToBucket(job.id);
    setToast(isBookmarked ? "Removed from Bucket List" : "⭐️ Added to Bucket List");
    if (onBookmarkToggle) onBookmarkToggle(job);
    setTimeout(() => setToast(null), 2500);
  };

  const skillsList = Array.isArray(job.skills) ? job.skills : (job.skills || "React, JavaScript").split(',').map(s => s.trim());

  return (
    <div className="card-panel relative bg-[#151A24] border border-[#1E2533] rounded-xl p-4 mb-3 hover:border-[#2D3748] transition flex flex-col md:flex-row md:items-center justify-between gap-4">
      {toast && (
        <div className="absolute -top-3 right-4 bg-[#3B82F6] text-white text-[11px] px-2.5 py-1 rounded-full font-bold shadow-lg animate-bounce z-10">
          {toast}
        </div>
      )}

      {/* Left side: Priority badge + Company Logo + Info */}
      <div className="flex items-start gap-3.5 flex-1">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityBadge.class}`}>
          {priorityBadge.text}
        </span>

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-white shadow-inner flex-shrink-0">
          {job.company ? job.company.substring(0, 1) : "D"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base font-bold text-white hover:text-[#3B82F6] cursor-pointer transition">
              {job.title}
            </h3>
            <span className="badge-platform">{job.platform || "Indeed"}</span>
            <span className="text-xs text-[#8A99AF]">{job.posted_time || "Posted 2h ago"}</span>
            {job.is_new && (
              <span className="px-1.5 py-0.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded text-[10px] font-bold">
                ✨ New
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8A99AF] mt-1 flex-wrap">
            <span className="font-medium text-white">{job.company}</span>
            <span>•</span>
            <span>📍 {job.location || "Bangalore, Karnataka"}</span>
            <span>•</span>
            <span className={job.work_mode === 'Remote' ? 'badge-remote' : 'badge-onsite'}>
              {job.work_mode || "On-site"}
            </span>
          </div>

          {/* Applicants Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="w-40 h-1.5 bg-[#1E2533] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"
                style={{ width: `${Math.min(100, ((job.applicants_count || 30) / (job.total_openings || 200)) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-[#8A99AF] font-medium">
              <strong className="text-white">{job.applicants_count || 30}</strong> / {job.total_openings || 200} Applied
            </span>
          </div>

          {/* Skills pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skillsList.map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-[#1E2533] border border-[#2D3748] rounded-md text-[11px] text-[#8A99AF] font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Shortlist Odds Gauge & Actions */}
      <div className="flex md:flex-col items-center justify-between md:items-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-[#1E2533] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-[#1E2533]" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path strokeDasharray={`${job.shortlist_odds || 88}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke={oddsColor} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold text-white leading-none">{job.shortlist_odds || 88}%</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-[11px] text-[#8A99AF] font-medium">Shortlist Odds</div>
            <div className="text-xs font-bold" style={{ color: oddsColor }}>
              {job.shortlist_odds >= 80 ? "High Match" : "Good Match"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExplain(true)}
            className="px-3.5 py-1.5 bg-[#1C2230] hover:bg-[#252D3D] text-[#3B82F6] border border-[#3B82F6]/30 rounded-lg text-xs font-semibold transition"
          >
            View Details
          </button>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg border transition ${
              isBookmarked
                ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#A78BFA]"
                : "bg-[#1C2230] hover:bg-[#252D3D] border-[#1E2533] text-[#8A99AF]"
            }`}
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
