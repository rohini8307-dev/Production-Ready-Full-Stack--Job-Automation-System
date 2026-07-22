import React from 'react';

export default function ResumeViewer({ profile }) {
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h4 className="text-sm font-bold text-white mb-2">Resume Intelligence Profile</h4>
      <div className="text-xs space-y-1 text-[#8A99AF]">
        <div><strong>Name:</strong> {profile?.user?.name || "Aditya Kumar"}</div>
        <div><strong>Email:</strong> {profile?.user?.email || "aditya@example.com"}</div>
        <div><strong>Domain Confidence:</strong> {profile?.domain_confidence || "Backend: 91%, Full Stack: 88%"}</div>
      </div>
    </div>
  );
}
