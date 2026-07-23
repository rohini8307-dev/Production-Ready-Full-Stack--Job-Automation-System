import React from 'react';

export default function SkillGraph() {
  return (
    <div className="card-panel p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-2">Skill Frequency Graph</h3>
      <div className="h-32 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
        [Graph: React (92%), TypeScript (84%), Python (76%)]
      </div>
    </div>
  );
}
