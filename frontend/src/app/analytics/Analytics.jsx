import React from 'react';
import Charts from '../../components/analytics/Charts.jsx';
import PieChart from '../../components/analytics/PieChart.jsx';
import SkillGraph from '../../components/analytics/SkillGraph.jsx';
import { profileStore } from '../../store/profileStore.js';

export default function Analytics() {
  if (!profileStore.isProfileCompleted) {
    return (
      <div className="max-w-6xl mx-auto card-panel py-16 text-center space-y-3">
        <div className="text-4xl">📊</div>
        <h3 className="text-base font-bold text-gray-900">Analytics Unavailable</h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Statistical conversion models require an active profile and scraped positions. Please complete onboarding first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card-panel p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-lg font-black text-gray-900">Platform Intelligence & Odds Analytics</h2>
        <p className="text-xs text-gray-500">Statistical models tracking recruiter response rates, skill demand trends, and platform conversions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Charts />
        <PieChart />
      </div>
      <SkillGraph />
    </div>
  );
}
