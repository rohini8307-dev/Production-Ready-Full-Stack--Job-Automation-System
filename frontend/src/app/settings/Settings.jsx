import React, { useState } from 'react';

export default function Settings() {
  const [scrapeFreq, setScrapeFreq] = useState("Every 4 hours");
  const [minOdds, setMinOdds] = useState(70);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
        <h2 className="text-lg font-black text-white">Platform & Agent Preferences</h2>
        <p className="text-xs text-[#8A99AF]">Configure autonomous scraping thresholds, API keys, and notification triggers.</p>
      </div>

      <div className="card-panel p-6 bg-[#151A24] border border-[#1E2533] rounded-xl space-y-4 text-xs">
        <div>
          <label className="block font-bold text-white mb-1">Agent 1 Discovery Frequency</label>
          <select
            value={scrapeFreq}
            onChange={(e) => setScrapeFreq(e.target.value)}
            className="w-full bg-[#0F131D] border border-[#1E2533] rounded-lg p-2 text-white"
          >
            <option>Every 2 hours</option>
            <option>Every 4 hours</option>
            <option>Daily at Midnight</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-white mb-1">Auto-Apply Minimum Odds Threshold ({minOdds}%)</label>
          <input
            type="range"
            min="50"
            max="95"
            value={minOdds}
            onChange={(e) => setMinOdds(Number(e.target.value))}
            className="w-full accent-[#3B82F6]"
          />
        </div>

        <div>
          <label className="block font-bold text-white mb-1">OpenAI / LLM API Key (For Agent 2 & 4 Deep Reasoning)</label>
          <input
            type="password"
            defaultValue="sk-proj-••••••••••••••••••••••••••••••••"
            className="w-full bg-[#0F131D] border border-[#1E2533] rounded-lg p-2 text-white font-mono"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button onClick={handleSave} className="btn-primary">
            {saved ? "✅ Settings Saved!" : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}
