import React, { useState } from 'react';

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black text-white">System & Agent Notifications</h2>
          <p className="text-xs text-[#8A99AF]">Real-time alerts from Discovery, Intelligence, and Application pipelines.</p>
        </div>
        {notifs.length > 0 && (
          <button
            onClick={() => setNotifs(notifs.map(n => ({ ...n, unread: false })))}
            className="btn-outline text-xs"
          >
            Mark All Read
          </button>
        )}
      </div>
      {notifs.length === 0 ? (
        <div className="card-panel py-12 text-center text-xs text-[#8A99AF]">
          No notifications yet. Alerts will appear here when Agent 1 discovers jobs matching your exact profile.
        </div>
      ) : (
        notifs.map(n => (
          <div key={n.id} className={`card-panel p-4 rounded-xl border transition ${n.unread ? "bg-[#1C2230] border-[#3B82F6]/50" : "bg-[#151A24] border-[#1E2533]"}`}>
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {n.unread && <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
                {n.title}
              </h4>
              <span className="text-[10px] text-[#5D6A80] font-mono">{n.time}</span>
            </div>
            <p className="text-xs text-[#8A99AF] mt-1">{n.desc}</p>
          </div>
        ))
      )}
    </div>
  );
}
