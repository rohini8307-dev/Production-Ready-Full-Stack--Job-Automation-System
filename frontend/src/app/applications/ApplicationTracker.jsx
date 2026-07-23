import React, { useState, useEffect } from 'react';
import ApplicationPipeline from '../../components/applications/ApplicationPipeline.jsx';
import RecentApplications from '../../components/applications/RecentApplications.jsx';
import { applicationService } from '../../services/application.service.js';

export default function ApplicationTracker({ initialTab = "All" }) {
  const [applications, setApplications] = useState([]);
  const [pipeline, setPipeline] = useState({});

  useEffect(() => {
    let mounted = true;
    applicationService.getApplications().then(res => {
      if (mounted && res) {
        setApplications(res.recent_applications || []);
        setPipeline(res.pipeline || {});
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card-panel p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-lg font-black text-gray-900">Application Pipeline & Kanban Tracker</h2>
        <p className="text-xs text-gray-500">Real-time tracking of submitted resumes, ATS screening notifications, and interview invites.</p>
      </div>
      <ApplicationPipeline counts={pipeline} />
      <RecentApplications applications={applications} />
    </div>
  );
}
