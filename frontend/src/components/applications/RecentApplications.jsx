import React from 'react';

export default function RecentApplications({ applications = [] }) {
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h3 className="text-sm font-bold text-white mb-3">Recent Application History</h3>
      <div className="space-y-2 text-xs">
        {applications.length === 0 ? (
          <div className="text-[#8A99AF]">No applications recorded yet. Use Auto Apply above!</div>
        ) : (
          applications.map((app, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-[#0F131D] rounded">
              <span className="font-semibold text-white">{app.title} @ {app.company}</span>
              <span className="text-[#10B981]">{app.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
