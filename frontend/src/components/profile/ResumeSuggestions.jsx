import React from 'react';

export default function ResumeSuggestions({ suggestions = [] }) {
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h4 className="text-sm font-bold text-white mb-2">AI Career Roadmap & Suggestions</h4>
      <ul className="list-disc pl-4 text-xs space-y-1 text-[#8A99AF]">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
