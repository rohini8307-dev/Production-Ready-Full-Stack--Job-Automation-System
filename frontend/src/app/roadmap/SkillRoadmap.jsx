import React from 'react';
import ResumeSuggestions from '../../components/profile/ResumeSuggestions.jsx';
import { profileStore } from '../../store/profileStore.js';

export default function SkillRoadmap() {
  if (!profileStore.isProfileCompleted) {
    return (
      <div className="max-w-5xl mx-auto card-panel py-16 text-center space-y-3">
        <div className="text-4xl">🗺️</div>
        <h3 className="text-base font-bold text-white">Skill Gap & Roadmap Standby</h3>
        <p className="text-xs text-[#8A99AF] max-w-md mx-auto">
          Personalized upskilling paths require target domain and parsed resume skills. Complete your profile onboarding first.
        </p>
      </div>
    );
  }

  const roadmapItems = profileStore.skillsMatch.missing.map((sk, idx) => ({
    skill: sk,
    priority: idx === 0 ? "High" : "Medium",
    timeframe: `${idx + 1} Weeks`,
    course: `Curated Industry Guide for ${sk}`
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
        <h2 className="text-lg font-black text-white">Personalized Skill Gap & Upskilling Roadmap</h2>
        <p className="text-xs text-[#8A99AF]">AI-curated learning paths to bridge top missing keywords and elevate shortlist odds to &gt;90%.</p>
      </div>
      {roadmapItems.length === 0 ? (
        <div className="card-panel py-12 text-center text-xs text-[#8A99AF]">
          No missing skills detected! Your profile is fully aligned with target domain criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmapItems.map((item, i) => (
            <div key={i} className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl space-y-2">
              <span className="badge-p1">{item.priority} Priority</span>
              <h3 className="text-base font-bold text-white">{item.skill}</h3>
              <div className="text-xs text-[#8A99AF]">Recommended Timeframe: <strong>{item.timeframe}</strong></div>
              <div className="text-[11px] text-[#3B82F6] bg-[#3B82F6]/10 p-2 rounded">{item.course}</div>
            </div>
          ))}
        </div>
      )}
      <ResumeSuggestions suggestions={[
        `Add explicit ${profileStore.primaryDomain || "target role"} project achievements.`,
        "Quantify leadership and performance improvements with clear metrics.",
        "Ensure all target key skills appear in summary and experience sections."
      ]} />
    </div>
  );
}
