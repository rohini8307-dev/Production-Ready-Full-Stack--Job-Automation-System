import React, { useState, useEffect } from 'react';
import PriorityTabs from '../../components/recommendations/PriorityTabs.jsx';
import JobCard from '../../components/recommendations/JobCard.jsx';
import AutoApplyButton from '../../components/applications/AutoApplyButton.jsx';
import { recommendationService } from '../../services/recommendation.service.js';

export default function PriorityJobs({ isProfileCompleted, scrapeVersion = 0 }) {
  const [tab, setTab] = useState("Priority 1");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isProfileCompleted) {
      setLoading(true);
      recommendationService.getRecommendations(tab).then(res => {
        setJobs(res?.recommendations || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      setJobs([]);
    }
  }, [tab, isProfileCompleted, scrapeVersion]);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center bg-[#151A24] p-4 rounded-xl border border-[#1E2533]">
        <div>
          <h2 className="text-lg font-black text-white">Priority Recommendations Queue</h2>
          <p className="text-xs text-[#8A99AF]">AI-ranked opportunities with highest statistical probability of recruiter response.</p>
        </div>
        <PriorityTabs activeTab={tab} setActiveTab={setTab} />
      </div>
      <div className="flex justify-end">
        <AutoApplyButton
          jobIds={jobs.map(j => j.id)}
          priorityLevel={tab}
          disabled={!isProfileCompleted || jobs.length === 0}
        />
      </div>
      {!isProfileCompleted ? (
        <div className="card-panel py-16 text-center space-y-3 border-2 border-dashed border-[#3B82F6]/30">
          <div className="text-3xl">🎯</div>
          <h3 className="text-sm font-bold text-white">Profile Onboarding Required</h3>
          <p className="text-xs text-[#8A99AF]">
            Complete your profile using the 🪄 Career Wizard to activate AI-matched priority recommendations.
          </p>
        </div>
      ) : loading ? (
        <div className="card-panel py-12 text-center">
          <div className="w-5 h-5 border-2 border-t-transparent border-[#3B82F6] rounded-full animate-spin mx-auto mb-2" />
          <div className="text-xs text-[#8A99AF]">Fetching AI-ranked positions...</div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="card-panel py-12 text-center space-y-2">
          <div className="text-2xl">⚡</div>
          <div className="text-xs text-[#8A99AF]">
            No positions discovered yet. Click <strong className="text-[#F59E0B]">⚡ Start New Scrape</strong> to begin discovery.
          </div>
        </div>
      ) : (
        jobs.map(j => <JobCard key={j.id} job={j} />)
      )}
    </div>
  );
}
