import React, { useState, useCallback } from 'react';
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
import { profileStore } from '../store/profileStore.js';

export default function AppRoutes() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWizard, setShowWizard] = useState(false);
  // Track profile completion as React state so components re-render when it changes
  const [isProfileCompleted, setIsProfileCompleted] = useState(profileStore.isProfileCompleted);
  // Track scrape completion to trigger dashboard refresh
  const [scrapeVersion, setScrapeVersion] = useState(0);

  const handleWizardClose = useCallback(() => {
    setShowWizard(false);
    // Sync React state with store after wizard completes
    setIsProfileCompleted(profileStore.isProfileCompleted);
  }, []);

  const handleScrapeTriggered = useCallback(() => {
    // Bump version to force child components to re-fetch data
    setScrapeVersion(v => v + 1);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0E14] text-white">
      <PageLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWizard={() => setShowWizard(true)}
        onScrapeTriggered={handleScrapeTriggered}
        isProfileCompleted={isProfileCompleted}
      >
        {activeTab === "dashboard" && (
          <Dashboard
            onOpenWizard={() => setShowWizard(true)}
            isProfileCompleted={isProfileCompleted}
            scrapeVersion={scrapeVersion}
          />
        )}
        {activeTab === "discover" && <DiscoverJobs isProfileCompleted={isProfileCompleted} />}
        {(activeTab === "recommendations" || activeTab === "priority") && (
          <PriorityJobs isProfileCompleted={isProfileCompleted} scrapeVersion={scrapeVersion} />
        )}
        {activeTab === "applications" && <ApplicationTracker isProfileCompleted={isProfileCompleted} />}
        {activeTab === "bucketlist" && <BucketList isProfileCompleted={isProfileCompleted} />}
        {activeTab === "applied" && <ApplicationTracker initialTab="Applied" isProfileCompleted={isProfileCompleted} />}
        {activeTab === "analytics" && <Analytics isProfileCompleted={isProfileCompleted} scrapeVersion={scrapeVersion} />}
        {activeTab === "profile" && <ResumeProfile isProfileCompleted={isProfileCompleted} />}
        {activeTab === "roadmap" && <SkillRoadmap isProfileCompleted={isProfileCompleted} />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "settings" && <Settings />}
      </PageLayout>

      {showWizard && (
        <CareerWizard
          onClose={handleWizardClose}
          onProfileActivated={() => setIsProfileCompleted(true)}
        />
      )}
    </div>
  );
}
