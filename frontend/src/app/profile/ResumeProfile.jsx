import React, { useEffect, useState } from 'react';
import ATSAnalysis from '../../components/profile/ATSAnalysis.jsx';
import SkillGap from '../../components/profile/SkillGap.jsx';
import ResumeViewer from '../../components/profile/ResumeViewer.jsx';
import { profileService } from '../../services/profile.service.js';
import { profileStore } from '../../store/profileStore.js';

export default function ResumeProfile() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (profileStore.isProfileCompleted) {
      profileService.getSummary().then(res => {
        if (mounted && res) setSummary(res);
      });
    }
    return () => { mounted = false; };
  }, []);

  if (!profileStore.isProfileCompleted) {
    return (
      <div className="max-w-6xl mx-auto card-panel py-16 text-center space-y-3">
        <div className="text-4xl">📄</div>
        <h3 className="text-base font-bold text-white">Resume & Profile Not Configured</h3>
        <p className="text-xs text-[#8A99AF] max-w-md mx-auto">
          Please complete your profile onboarding and resume upload using the Career Wizard to activate Agent 3 intelligence.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
        <h2 className="text-lg font-black text-white">Resume Intelligence & ATS Optimization (Agent 3)</h2>
        <p className="text-xs text-[#8A99AF]">Deep keyword density extraction, semantic gap calculation, and domain confidence evaluation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ATSAnalysis summary={summary || profileStore} />
        <SkillGap gap={summary?.skills_match || profileStore.skillsMatch} />
      </div>
      <ResumeViewer profile={summary || profileStore} />
    </div>
  );
}
