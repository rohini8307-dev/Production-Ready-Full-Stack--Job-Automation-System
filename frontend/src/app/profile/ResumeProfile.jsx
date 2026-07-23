import React, { useEffect, useState } from 'react';
import ATSAnalysis from '../../components/profile/ATSAnalysis.jsx';
import SkillGap from '../../components/profile/SkillGap.jsx';
import ResumeViewer from '../../components/profile/ResumeViewer.jsx';
import { profileService } from '../../services/profile.service.js';
import { profileStore } from '../../store/profileStore.js';

export default function ResumeProfile() {
  const [summary, setSummary] = useState(null);
  const [aiModal, setAiModal] = useState(null); // 'analyze' or 'enhance'
  const [resumeText, setResumeText] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

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
      <div className="card-panel p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Full Name</p>
            <p className="font-medium text-gray-900">{profileStore.fullName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-900">{profileStore.email || "Not provided"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Primary Domain</p>
            <p className="font-medium text-gray-900">{profileStore.primaryDomain || "Not provided"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Current Location</p>
            <p className="font-medium text-gray-900">{profileStore.currentLocation || "Not provided"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Work Mode</p>
            <p className="font-medium text-gray-900">{profileStore.workMode || "Remote"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Expected Salary</p>
            <p className="font-medium text-gray-900">
              {profileStore.expectedSalaryMin && profileStore.expectedSalaryMax 
                ? `$${profileStore.expectedSalaryMin} - $${profileStore.expectedSalaryMax}` 
                : "Not provided"}
            </p>
          </div>
          {profileStore.portfolioUrl && (
            <div className="md:col-span-2">
              <p className="text-gray-500 mb-1">Portfolio / Link</p>
              <a href={profileStore.portfolioUrl.startsWith('http') ? profileStore.portfolioUrl : `https://${profileStore.portfolioUrl}`} target="_blank" rel="noreferrer" className="font-medium text-[#D91656] hover:underline">
                {profileStore.portfolioUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="card-panel p-4 bg-[#FFFFFF] border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-gray-900">Resume Intelligence & ATS Optimization (Agent 3)</h2>
          <p className="text-xs text-gray-500">Deep keyword density extraction, semantic gap calculation, and domain confidence evaluation.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setAiModal('analyze')}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#3B82F6] text-white hover:bg-blue-600 transition shadow"
          >
            🧠 Suggestion (Analyzer)
          </button>
          <button 
            onClick={() => setAiModal('enhance')}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#10B981] text-white hover:bg-emerald-600 transition shadow"
          >
            ⚡ ATS Automatic Enhancer
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ATSAnalysis summary={summary || profileStore} />
        <SkillGap gap={summary?.skills_match || profileStore.skillsMatch} />
      </div>
      <ResumeViewer profile={summary || profileStore} />
      
      {aiModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {aiModal === 'analyze' ? "🧠 AI Resume Analyzer" : "⚡ ATS Automatic Enhancer"}
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Click below for Gemini AI to {aiModal === 'analyze' ? "generate ATS suggestions" : "rewrite it for ATS compatibility"} using your uploaded resume.
            </p>
            {aiResult && (
              <div className="mb-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-2">AI Output:</h4>
                <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {aiResult}
                </div>
              </div>
            )}
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => { setAiModal(null); setAiResult(''); }}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
              {aiResult && aiModal === 'enhance' && (
                <button 
                  onClick={async () => {
                    if (window.jspdf) {
                      const { jsPDF } = window.jspdf;
                      const doc = new jsPDF();
                      doc.setFontSize(12);
                      const splitText = doc.splitTextToSize(aiResult, 180);
                      doc.text(splitText, 15, 20);
                      doc.save('Enhanced_Resume_ATS.pdf');
                    } else {
                      alert("PDF library is still loading, please try again in a moment!");
                    }
                  }}
                  className="px-4 py-2 text-xs font-bold bg-[#10B981] text-white rounded-lg shadow hover:bg-emerald-600 transition"
                >
                  Download .pdf
                </button>
              )}
              <button 
                onClick={async () => {
                  setAiLoading(true);
                  try {
                    const endpoint = aiModal === 'analyze' ? '/api/profile/analyze-resume' : '/api/profile/enhance-ats';
                    
                    const formData = new FormData();
                    if (profileStore.resumeFile && profileStore.resumeFile instanceof File) {
                      formData.append("file", profileStore.resumeFile);
                    } else {
                      formData.append("resume_text", "A Full Stack Developer resume with React, Node.js, AWS and Docker.");
                    }

                    const res = await fetch(`http://localhost:8000${endpoint}`, {
                      method: 'POST',
                      body: formData
                    });
                    const data = await res.json();
                    
                    if(aiModal === 'analyze') {
                      if (data.ats_score) {
                        setAiResult(`ATS Score: ${data.ats_score}/100\n\nSuggestions:\n${data.suggestions.map(s => '• ' + s).join('\n')}`);
                        // Refresh profile summary to get updated score
                        profileService.getSummary().then(s => setSummary(s));
                      } else {
                        setAiResult("Error: " + JSON.stringify(data));
                      }
                    } else {
                      setAiResult(data.enhanced_resume || "Error: " + JSON.stringify(data));
                    }
                  } catch (e) {
                    setAiResult("Error calling AI: " + e.message + "\nMake sure GEMINI_API_KEY is set in the backend.");
                  }
                  setAiLoading(false);
                }}
                disabled={aiLoading}
                className="px-4 py-2 text-xs font-bold bg-[#3B82F6] text-white rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                {aiLoading && <span className="w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin"/>}
                {aiLoading ? "Processing..." : "Run AI"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
