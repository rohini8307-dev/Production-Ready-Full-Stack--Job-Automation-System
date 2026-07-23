import React, { useEffect, useState } from 'react';
import DashboardCards from '../../components/dashboard/DashboardCards.jsx';
import PriorityTabs from '../../components/recommendations/PriorityTabs.jsx';
import JobCard from '../../components/recommendations/JobCard.jsx';
import ActivityFeed from '../../components/scraper/ActivityFeed.jsx';
import AutoApplyButton from '../../components/applications/AutoApplyButton.jsx';
import { recommendationService } from '../../services/recommendation.service.js';
import { analyticsService } from '../../services/analytics.service.js';
import { profileStore } from '../../store/profileStore.js';

export default function Dashboard({ onOpenWizard, isProfileCompleted, scrapeVersion = 0 }) {
  const [priorityTab, setPriorityTab] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [overview, setOverview] = useState({
    resume_score: 0,
    ats_score: 0,
    active_recommendations: 0,
    shortlist_probability: 0,
    applied_jobs: 0,
    pipeline: { Applied: 0, Screening: 0, Assessment: 0, Interview: 0, Offer: 0, Rejected: 0 }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isProfileCompleted) {
      setLoading(true);
      Promise.all([
        analyticsService.getOverview(),
        recommendationService.getRecommendations(priorityTab)
      ]).then(([ovRes, recRes]) => {
        if (mounted) {
          if (ovRes) setOverview(ovRes);
          setJobs(recRes?.recommendations || []);
          setLoading(false);
        }
      }).catch(() => {
        if (mounted) setLoading(false);
      });
    } else {
      setJobs([]);
      setOverview({
        resume_score: 0, ats_score: 0, active_recommendations: 0,
        shortlist_probability: 0, applied_jobs: 0,
        pipeline: { Applied: 0, Screening: 0, Assessment: 0, Interview: 0, Offer: 0, Rejected: 0 }
      });
    }
    return () => { mounted = false; };
  }, [priorityTab, isProfileCompleted, scrapeVersion]);

  const filteredJobs = priorityTab === "All"
    ? jobs
    : jobs.filter(j => j.priority === priorityTab);

  const allJobIds = filteredJobs.map(j => j.id);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Top 5 Metric Cards */}
      <DashboardCards overview={overview} />

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          {/* Header & Priority Filter Bar */}
          <div
            className="card-panel p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
          >
            <div className="flex items-center gap-3">
              <PriorityTabs activeTab={priorityTab} setActiveTab={setPriorityTab} />
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-lg border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-dim)', color: 'var(--text-secondary)' }}
              >
                {filteredJobs.length} Jobs Found
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <select
                className="rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-main)', color: 'var(--text-main)' }}
              >
                <option>Sort by: Shortlist Odds (High → Low)</option>
                <option>Sort by: Posted Date (Newest first)</option>
                <option>Sort by: Company Trust Score</option>
              </select>

              <AutoApplyButton
                jobIds={allJobIds}
                priorityLevel={priorityTab === "All" ? "Priority 1" : priorityTab}
                disabled={!isProfileCompleted || filteredJobs.length === 0}
              />
            </div>
          </div>

          {/* Job Card List / Zero State */}
          {loading ? (
            <div className="card-panel py-12 text-center">
              <div
                className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
                style={{ borderColor: 'var(--gold-primary)', borderTopColor: 'transparent' }}
              />
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading AI-matched recommendations...</div>
            </div>
          ) : !isProfileCompleted ? (
            <div
              className="card-panel py-16 text-center space-y-4 border-2 border-dashed rounded-xl"
              style={{ borderColor: 'var(--border-gold)', background: 'var(--bg-card)' }}
            >
              <div className="text-4xl">🧭</div>
              <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>Profile Onboarding Required</h3>
              <p className="text-xs max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                No sample or test data is shown. Complete your profile with your Full Name, Email,
                Location, Domain, Resume and Skills — then click <strong style={{ color: 'var(--gold-bright)' }}>⚡ Start New Scrape</strong> to begin Agent 1 Discovery.
              </p>
              <button
                onClick={onOpenWizard}
                className="btn-primary text-xs px-5 py-2.5 shadow-lg"
              >
                🪄 Setup Profile & Start New Scrape →
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="card-panel py-12 text-center space-y-3">
              <div className="text-3xl">⚡</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                Profile Active — No Jobs Discovered Yet
              </div>
              <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
                Click <strong style={{ color: 'var(--gold-bright)' }}>⚡ Start New Scrape</strong> in the topbar to
                trigger Agent 1 Discovery for <strong style={{ color: 'var(--text-main)' }}>{profileStore.primaryDomain || "your target domain"}</strong> positions.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>

        {/* Right column: Live Agent Activity Feed */}
        <div className="lg:col-span-1 space-y-4 sticky top-20">
          <ActivityFeed />

          <div
            className="card-panel p-4 rounded-xl border"
            style={{
              background: 'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))',
              borderColor: 'var(--border-gold)'
            }}
          >
            <div className="flex items-center gap-2 font-extrabold text-sm mb-1.5" style={{ color: 'var(--gold-bright)' }}>
              <span>🚀</span>
              <span>NOAH Copilot Pro-Tip</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Jobs categorized as <strong style={{ color: 'var(--gold-bright)' }}>Priority 1</strong> have &gt;80%
              shortlist odds based on your ATS profile and employer responsiveness. Use{' '}
              <strong style={{ color: 'var(--text-main)' }}>Auto Apply All</strong> to let Agent 4 submit customized resumes asynchronously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
