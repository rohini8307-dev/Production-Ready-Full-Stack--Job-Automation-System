import React from 'react';

export default function RecentApplications({ applications = [] }) {
  return (
    <div className="card-panel p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Application History</h3>
      <div className="space-y-2 text-xs">
        {applications.length === 0 ? (
          <div className="text-gray-500">No applications recorded yet. Use Auto Apply above!</div>
        ) : (
          applications.map((app, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-gray-50 border border-gray-100 rounded">
              <span className="font-semibold text-gray-900">{app.job?.title || app.title} @ {app.job?.company || app.company}</span>
              <span className="text-[#10B981] font-medium">{app.status || app.stage}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
