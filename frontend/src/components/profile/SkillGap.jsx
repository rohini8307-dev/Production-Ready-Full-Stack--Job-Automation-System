import React from 'react';

export default function SkillGap({ gap }) {
  const matched = gap?.matched || ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "Python", "FastAPI"];
  const missing = gap?.missing || ["Next.js", "AWS", "Docker", "GraphQL"];

  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h4 className="text-sm font-bold text-white mb-3">Skill Gap Breakdown</h4>
      <div className="space-y-3 text-xs">
        <div>
          <div className="text-[#10B981] font-semibold mb-1.5 flex items-center gap-1.5">
            <span>✅ Matched Skills ({matched.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matched.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-[#1E2533]">
          <div className="text-[#EF4444] font-semibold mb-1.5 flex items-center gap-1.5">
            <span>🔴 Top Missing Skills ({missing.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 rounded font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
