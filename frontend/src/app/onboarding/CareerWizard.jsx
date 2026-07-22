import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload.jsx';
import CareerPreferences from './CareerPreferences.jsx';
import { profileStore } from '../../store/profileStore.js';

export default function CareerWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Mandatory
    fullName: profileStore.fullName || "",
    email: profileStore.email || "",
    resumeFile: profileStore.resumeFile || null,
    currentLocation: profileStore.currentLocation || "Bangalore, Karnataka",
    workMode: profileStore.workMode || "Remote",
    preferredLocations: profileStore.preferredLocations || ["Bangalore"],

    // Highly Recommended
    primaryDomain: profileStore.primaryDomain || "Full Stack Developer",
    keySkills: profileStore.keySkills || ["React", "TypeScript", "Node.js", "Docker", "AWS"],
    expectedSalaryMin: profileStore.expectedSalaryMin || "18",
    expectedSalaryMax: profileStore.expectedSalaryMax || "35",

    // Optional
    phone: profileStore.phone || "",
    portfolioUrl: profileStore.portfolioUrl || "",
    college: profileStore.college || "",
    graduationYear: profileStore.graduationYear || "",
    cgpa: profileStore.cgpa || "",
    yearsOfExperience: profileStore.yearsOfExperience || 2,
    willingToRelocate: profileStore.willingToRelocate ?? true,
    noticePeriod: profileStore.noticePeriod || "30 Days",
    jobTypes: profileStore.jobTypes || ["Full-time"]
  });

  const [resumeParsed, setResumeParsed] = useState(false);

  const handleResumeDataExtracted = (extracted) => {
    setFormData((prev) => ({
      ...prev,
      keySkills: Array.from(new Set([...prev.keySkills, ...extracted.skills])),
      college: extracted.college || prev.college,
      graduationYear: extracted.graduationYear || prev.graduationYear,
      cgpa: extracted.cgpa || prev.cgpa,
      yearsOfExperience: extracted.yearsOfExperience ?? prev.yearsOfExperience
    }));
    setResumeParsed(true);
  };

  const handleSubmitProfile = () => {
    // Save to profileStore
    Object.assign(profileStore, {
      ...formData,
      isProfileCompleted: true,
      resumeScore: 84,
      atsScore: 80,
      skillsMatch: {
        overall: 82,
        matched: formData.keySkills,
        missing: ["Kubernetes", "GraphQL"]
      }
    });

    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#151A24] border border-[#3B82F6]/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-fade-in max-h-[90vh] flex flex-col justify-between">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8A99AF] hover:text-white text-lg font-bold">✕</button>

        <div>
          <div className="flex items-center gap-3 mb-4 border-b border-[#1E2533] pb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-xl text-white font-extrabold shadow-lg">
              🪄
            </div>
            <div>
              <h3 className="text-base font-black text-white">NOAH Career Intelligence Profile Setup</h3>
              <p className="text-xs text-[#8A99AF]">Step {step} of 4 • Complete onboarding to activate Autonomous Agents & Scraper</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#0F131D] h-1.5 rounded-full overflow-hidden mb-5">
            <div
              className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0F131D] rounded-xl border border-[#1E2533] space-y-3">
                <h4 className="font-extrabold text-sm text-white">Identity & Account Details (Mandatory)</h4>
                <div>
                  <label className="block font-bold text-[#8A99AF] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aditya Kumar"
                    className="w-full bg-[#151A24] border border-[#1E2533] rounded-lg p-2.5 text-white focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#8A99AF] mb-1">Email ID (for login, notifications & verification) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. aditya@example.com"
                    className="w-full bg-[#151A24] border border-[#1E2533] rounded-lg p-2.5 text-white focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.fullName.trim() || !formData.email.trim()) {
                      alert("Please enter both Full Name and Email ID to continue.");
                      return;
                    }
                    setStep(2);
                  }}
                  className="btn-primary px-6 py-2.5"
                >
                  Next: Upload Resume →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <ResumeUpload
                onUploadComplete={(f) => setFormData({ ...formData, resumeFile: f })}
                onDataExtracted={handleResumeDataExtracted}
              />
              <div className="flex justify-between items-center pt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-outline">← Back</button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={false}
                  className="btn-primary px-6 py-2.5 disabled:opacity-40"
                >
                  Next: Review Preferences →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <CareerPreferences
              formData={formData}
              setFormData={setFormData}
              onPrev={() => setStep(2)}
              onNext={handleSubmitProfile}
            />
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/20">
                🎉
              </div>
              <h4 className="text-lg font-black text-white">Profile Synchronized & Activated!</h4>
              <p className="text-xs text-[#8A99AF] max-w-md mx-auto leading-relaxed">
                Welcome abroad, <strong className="text-white">{formData.fullName}</strong>! All 4 Autonomous Agents now have your exact criteria (<strong className="text-[#3B82F6]">{formData.primaryDomain}</strong> in <strong className="text-[#10B981]">{formData.currentLocation}</strong>).
              </p>
              <div className="p-3 bg-[#0F131D] rounded-xl border border-[#1E2533] text-xs text-gray-300 max-w-md mx-auto flex justify-around">
                <div><span>ATS Baseline:</span> <strong className="text-[#10B981] font-mono">80/100</strong></div>
                <div><span>Target Domain:</span> <strong className="text-white">{formData.primaryDomain}</strong></div>
                <div><span>Skills Tracked:</span> <strong className="text-[#3B82F6] font-mono">{formData.keySkills.length}</strong></div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="btn-gold px-8 py-3 text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition"
                >
                  🚀 Launch Dashboard & Click ⚡ Start New Scrape
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
