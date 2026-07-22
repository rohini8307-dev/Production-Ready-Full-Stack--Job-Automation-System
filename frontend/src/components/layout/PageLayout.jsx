import React from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import Footer from './Footer.jsx';

export default function PageLayout({ children, activeTab, setActiveTab, onOpenWizard, onScrapeTriggered, isProfileCompleted, session, onLogout }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenWizard={onOpenWizard}
          onScrapeTriggered={onScrapeTriggered}
          isProfileCompleted={isProfileCompleted}
          session={session}
          onLogout={onLogout}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
