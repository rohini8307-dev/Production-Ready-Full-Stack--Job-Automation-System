import React, { useState, useCallback, useEffect } from 'react';
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
import Login from '../app/auth/Login.jsx';
import { profileStore } from '../store/profileStore.js';

export default function AppRoutes() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWizard, setShowWizard] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(profileStore.isProfileCompleted);
  const [scrapeVersion, setScrapeVersion] = useState(0);

  // Authentication session state stored in localStorage
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem('noah_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleAuthSuccess = (newSession) => {
    setSession(newSession);
    if (newSession.name && !profileStore.fullName) {
      profileStore.fullName = newSession.name;
    }
    if (newSession.email && !profileStore.email) {
      profileStore.email = newSession.email;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('noah_session');
    setSession(null);
  };

  const handleWizardClose = useCallback(() => {
    setShowWizard(false);
    setIsProfileCompleted(profileStore.isProfileCompleted);
  }, []);

  const handleScrapeTriggered = useCallback(() => {
    setScrapeVersion(v => v + 1);
  }, []);

  // If no active session, present the Login view
  if (!session) {
    return <Login onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <PageLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWizard={() => setShowWizard(true)}
        onScrapeTriggered={handleScrapeTriggered}
        isProfileCompleted={isProfileCompleted}
        session={session}
        onLogout={handleLogout}
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
