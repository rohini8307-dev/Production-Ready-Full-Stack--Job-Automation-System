import React, { useState } from 'react';
import ApplicationPipeline from '../../components/applications/ApplicationPipeline.jsx';
import RecentApplications from '../../components/applications/RecentApplications.jsx';

export default function ApplicationTracker({ initialTab = "All" }) {
  const [applications, setApplications] = useState([]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
        <h2 className="text-lg font-black text-white">Application Pipeline & Kanban Tracker</h2>
        <p className="text-xs text-[#8A99AF]">Real-time tracking of submitted resumes, ATS screening notifications, and interview invites.</p>
      </div>
      <ApplicationPipeline />
      <RecentApplications applications={applications} />
    </div>
  );
}
