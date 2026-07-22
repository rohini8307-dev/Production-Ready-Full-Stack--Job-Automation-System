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
      // Reset to zero state when profile not completed
      setJobs([]);
      setOverview({
        resume_score: 0, ats_score: 0, active_recommendations: 0,
        shortlist_probability: 0, applied_jobs: 0,
        pipeline: { Applied: 0, Screening: 0, Assessment: 0, Interview: 0, Offer: 0, Rejected: 0 }
      });
    }
    return () => { mounted = false; };
  }, [priorityTab, isProfileCompleted, scrapeVersion]); // Re-fetch on scrapeVersion bump

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
          <div className="card-panel bg-[#151A24] border border-[#1E2533] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PriorityTabs activeTab={priorityTab} setActiveTab={setPriorityTab} />
              <span className="text-xs font-bold text-[#8A99AF] px-2.5 py-1 bg-[#0F131D] rounded-lg border border-[#1E2533]">
                {filteredJobs.length} Jobs Found
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <select className="bg-[#0F131D] border border-[#1E2533] rounded-lg px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none">
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
              <div className="w-6 h-6 border-2 border-t-transparent border-[#3B82F6] rounded-full animate-spin mx-auto mb-3" />
              <div className="text-sm text-[#8A99AF]">Loading AI-matched recommendations...</div>
            </div>
          ) : !isProfileCompleted ? (
            <div className="card-panel py-16 text-center space-y-4 border-2 border-dashed border-[#3B82F6]/40">
              <div className="text-4xl">🧭</div>
              <h3 className="text-base font-bold text-white">Profile Onboarding Required</h3>
              <p className="text-xs text-[#8A99AF] max-w-md mx-auto leading-relaxed">
                No sample or test data is shown. Complete your profile with your Full Name, Email,
                Location, Domain, Resume and Skills — then click <strong className="text-[#F59E0B]">⚡ Start New Scrape</strong> to begin Agent 1 Discovery.
              </p>
              <button
                onClick={onOpenWizard}
                className="btn-primary text-xs px-5 py-2.5 shadow-lg shadow-blue-500/20"
              >
                🪄 Start Career Wizard & Setup Profile →
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="card-panel py-12 text-center space-y-3">
              <div className="text-3xl">⚡</div>
              <div className="text-sm font-bold text-white">
                Profile Active — No Jobs Discovered Yet
              </div>
              <p className="text-xs text-[#8A99AF]">
                Click <strong className="text-[#F59E0B]">⚡ Start New Scrape</strong> in the topbar to
                trigger Agent 1 Discovery for <strong className="text-white">{profileStore.primaryDomain || "your target domain"}</strong> positions.
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

          <div className="card-panel p-4 bg-gradient-to-br from-[#151A24] to-[#1E2533] border border-[#3B82F6]/30 rounded-xl">
            <div className="flex items-center gap-2 text-[#3B82F6] font-extrabold text-sm mb-1.5">
              <span>🚀</span>
              <span>NOAH Copilot Pro-Tip</span>
            </div>
            <p className="text-xs text-[#8A99AF] leading-relaxed">
              Jobs categorized as <strong className="text-[#EF4444]">Priority 1</strong> have &gt;80%
              shortlist odds based on your ATS profile and employer responsiveness. Use{' '}
              <strong>Auto Apply All</strong> to let Agent 4 submit customized resumes asynchronously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
