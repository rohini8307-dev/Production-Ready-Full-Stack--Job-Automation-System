import React from 'react';
import ResumeScoreCard from './ResumeScoreCard.jsx';
import ATSScoreCard from './ATSScoreCard.jsx';
import RecommendationCard from './RecommendationCard.jsx';
import ShortlistProbabilityCard from './ShortlistProbabilityCard.jsx';
import AppliedJobsCard from './AppliedJobsCard.jsx';

export default function DashboardCards({ overview }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <ResumeScoreCard score={overview?.resume_score ?? 0} />
      <ATSScoreCard score={overview?.ats_score ?? 0} />
      <RecommendationCard count={overview?.active_recommendations ?? 0} />
      <ShortlistProbabilityCard percentage={overview?.shortlist_probability ?? 0} />
      <AppliedJobsCard count={overview?.applied_jobs ?? 0} />
    </div>
  );
}
