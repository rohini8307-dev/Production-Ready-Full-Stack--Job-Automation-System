import React, { useState, useEffect } from 'react';
import PriorityTabs from '../../components/recommendations/PriorityTabs.jsx';
import JobCard from '../../components/recommendations/JobCard.jsx';
import AutoApplyButton from '../../components/applications/AutoApplyButton.jsx';
import { recommendationService } from '../../services/recommendation.service.js';
import { profileStore } from '../../store/profileStore.js';

export default function PriorityJobs() {
  const [tab, setTab] = useState("Priority 1");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profileStore.isProfileCompleted) {
      setLoading(true);
      recommendationService.getRecommendations(tab).then(res => {
        setJobs(res?.recommendations || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [tab]);

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
        <AutoApplyButton jobIds={jobs.map(j => j.id)} priorityLevel={tab} />
      </div>
      {!profileStore.isProfileCompleted ? (
        <div className="card-panel py-12 text-center text-xs text-[#8A99AF]">
          Profile onboarding required. Complete your profile using the Career Wizard to view priority matches.
        </div>
      ) : jobs.length === 0 ? (
        <div className="card-panel py-12 text-center text-xs text-[#8A99AF]">
          No priority positions discovered yet. Click ⚡ Start New Scrape across targeted platforms.
        </div>
      ) : (
        jobs.map(j => <JobCard key={j.id} job={j} />)
      )}
    </div>
  );
}
