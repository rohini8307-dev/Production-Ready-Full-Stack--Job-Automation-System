import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload.jsx';
import CareerPreferences from './CareerPreferences.jsx';
import { profileStore } from '../../store/profileStore.js';

export default function CareerWizard({ onClose, onProfileActivated }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: profileStore.fullName || "",
    email: profileStore.email || "",
    resumeFile: profileStore.resumeFile || null,
    currentLocation: profileStore.currentLocation || "",
    workMode: profileStore.workMode || "Remote",
    preferredLocations: profileStore.preferredLocations || [],
    primaryDomain: profileStore.primaryDomain || "",
    keySkills: profileStore.keySkills || [],
    expectedSalaryMin: profileStore.expectedSalaryMin || "",
    expectedSalaryMax: profileStore.expectedSalaryMax || "",
    phone: profileStore.phone || "",
    portfolioUrl: profileStore.portfolioUrl || "",
    college: profileStore.college || "",
    graduationYear: profileStore.graduationYear || "",
    cgpa: profileStore.cgpa || "",
    yearsOfExperience: profileStore.yearsOfExperience || 0,
    willingToRelocate: profileStore.willingToRelocate ?? false,
    noticePeriod: profileStore.noticePeriod || "Immediate",
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
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Full Name and Email are required.");
      setStep(1);
      return;
    }
    if (!formData.currentLocation.trim()) {
      alert("Current Location is required. Please go back to Step 3 and enter your location.");
      return;
    }
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
    if (onProfileActivated) onProfileActivated();
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-fade-in max-h-[90vh] flex flex-col justify-between border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-gold)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 hover:text-white text-lg font-bold" style={{ color: 'var(--text-dim)' }}>✕</button>

        <div>
          <div className="flex items-center gap-3 mb-4 border-b pb-3" style={{ borderColor: 'var(--border-dim)' }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-extrabold shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-deep))', color: '#0F0804' }}
            >
              🪄
            </div>
            <div>
              <h3 className="text-base font-black" style={{ color: 'var(--text-main)' }}>NOAH Career Intelligence Profile Setup</h3>
              <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Step {step} of 4 • Complete onboarding to activate Autonomous Agents & Scraper</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden mb-5" style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(step / 4) * 100}%`,
                background: 'linear-gradient(90deg, var(--gold-deep), var(--gold-bright))'
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-main)' }}>
                <h4 className="font-extrabold text-sm" style={{ color: 'var(--text-main)' }}>Identity & Account Details (Mandatory)</h4>
                <div>
                  <label className="block font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aditya Kumar"
                    className="w-full rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Email ID (for login, notifications & verification) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. aditya@example.com"
                    className="w-full rounded-lg p-2.5"
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
                  className="btn-primary px-6 py-2.5"
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
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-3xl mx-auto shadow-lg"
                style={{ background: 'var(--gold-subtle)', borderColor: 'var(--gold-bright)' }}
              >
                🎉
              </div>
              <h4 className="text-lg font-black" style={{ color: 'var(--text-main)' }}>Profile Synchronized & Activated!</h4>
              <p className="text-xs max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Welcome aboard, <strong style={{ color: 'var(--text-gold)' }}>{formData.fullName}</strong>! All 4 Autonomous Agents now have your exact criteria (<strong style={{ color: 'var(--gold-bright)' }}>{formData.primaryDomain}</strong> in <strong style={{ color: 'var(--text-gold)' }}>{formData.currentLocation}</strong>).
              </p>
              <div
                className="p-3 rounded-xl border text-xs max-w-md mx-auto flex justify-around"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-main)', color: 'var(--text-main)' }}
              >
                <div><span>ATS Baseline:</span> <strong style={{ color: 'var(--gold-bright)' }} className="font-mono">80/100</strong></div>
                <div><span>Target Domain:</span> <strong style={{ color: 'var(--text-gold)' }}>{formData.primaryDomain}</strong></div>
                <div><span>Skills Tracked:</span> <strong style={{ color: 'var(--gold-bright)' }} className="font-mono">{formData.keySkills.length}</strong></div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="btn-gold px-8 py-3 text-sm shadow-xl hover:scale-105 transition"
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
