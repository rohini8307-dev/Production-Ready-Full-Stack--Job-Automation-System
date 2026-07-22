import React from 'react';

export default function SkillGraph() {
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h3 className="text-sm font-bold text-white mb-2">Skill Frequency Graph</h3>
      <div className="h-32 bg-[#0F131D] rounded flex items-center justify-center text-xs text-[#8A99AF]">
        [Graph: React (92%), TypeScript (84%), Python (76%)]
      </div>
    </div>
  );
}
