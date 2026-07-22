import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import Dashboard from '../app/dashboard/Dashboard.jsx';
import DiscoverJobs from '../app/discover/DiscoverJobs.jsx';
import PriorityJobs from '../app/recommendations/PriorityJobs.jsx';
import ApplicationTracker from '../app/applications/ApplicationTracker.jsx';
import BucketList from '../app/bucketlist/BucketList.jsx';
import Analytics from '../app/analytics/Analytics.jsx';
import ResumeProfile from '../app/profile/ResumeProfile.jsx';
import SkillRoadmap from '../app/roadmap/SkillRoadmap.jsx';
import Notifications from '../app/notifications/Notifications.jsx';
import Settings from '../app/settings/Settings.jsx';
import CareerWizard from '../app/onboarding/CareerWizard.jsx';

export default function AppRoutes() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0E14] text-white">
      <PageLayout activeTab={activeTab} setActiveTab={setActiveTab} onOpenWizard={() => setShowWizard(true)}>
        {activeTab === "dashboard" && <Dashboard onOpenWizard={() => setShowWizard(true)} />}
        {activeTab === "discover" && <DiscoverJobs />}
        {(activeTab === "recommendations" || activeTab === "priority") && <PriorityJobs />}
        {activeTab === "applications" && <ApplicationTracker />}
        {activeTab === "bucketlist" && <BucketList />}
        {activeTab === "applied" && <ApplicationTracker initialTab="Applied" />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "profile" && <ResumeProfile />}
        {activeTab === "roadmap" && <SkillRoadmap />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "settings" && <Settings />}
      </PageLayout>
      {showWizard && <CareerWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
