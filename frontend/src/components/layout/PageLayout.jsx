import React from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import Footer from './Footer.jsx';

export default function PageLayout({ children, activeTab, setActiveTab, onOpenWizard }) {
  return (
    <div className="flex min-h-screen bg-[#0B0E14]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenWizard={onOpenWizard} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
